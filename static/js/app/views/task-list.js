;(function () {

  App.Views.TaskList = Backbone.View.extend({

    el: '#app',

    template: Handlebars.compile($('#tpl-app').html()),

    searchQuery: '',
    categoryFilter: '',

    initialize: function () {
      this.collection = App.tasks;
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'change', this.render);
      this.listenTo(this.collection, 'destroy', this.render);
    },

    render: function () {
      this.$el.html(this.template());
      this.renderProgress();
      this.renderQuickAdd();
      this.renderFilterPills();
      this.renderList();
      this._bindSearch();
      return this;
    },

    renderProgress: function () {
      var sub = new App.Views.Progress({ collection: this.collection });
      $('#progress-region').html(sub.render().el);
    },

    renderQuickAdd: function () {
      var html = Handlebars.compile($('#tpl-quick-add').html())();
      $('#add-region').html(html);
      this._bindQuickAdd();
    },

    renderFilterPills: function () {
      var cats = [
        { label: 'All', slug: '' },
        { label: 'General', slug: 'general' },
        { label: 'Work', slug: 'work' },
        { label: 'Personal', slug: 'personal' },
        { label: 'Learning', slug: 'learning' }
      ];
      _.each(cats, function (c) { c.active = c.slug === this.categoryFilter; }, this);
      var html = Handlebars.compile($('#tpl-filter-pills').html())({
        categories: cats,
        hasActive: this.categoryFilter.length > 0
      });
      $('#add-region').after('<div id="filter-region" class="mb-3">' + html + '</div>');
      this._bindFilterPills();
    },

    renderList: function () {
      var pending = this.collection.pending();
      var done    = this.collection.done();
      var hasSearch = this.searchQuery.length > 0;
      var hasCat = this.categoryFilter.length > 0;

      if (hasSearch || hasCat) {
        pending = _.filter(pending, _.bind(this._matchTask, this));
        done = _.filter(done, _.bind(this._matchTask, this));
      }

      var listHtml = Handlebars.compile($('#tpl-task-list').html())({
        pendingCount: pending.length,
        doneCount: done.length
      });
      $('#list-region').html(listHtml);

      var self = this;
      if (pending.length === 0 && done.length === 0) {
        if (hasSearch) {
          var html = Handlebars.compile($('#tpl-empty-filtered').html())({ query: this.searchQuery });
          $('#pending-list').html(html);
          App.Animations.animateIn('#pending-list .empty-state');
        } else {
          var html = Handlebars.compile($('#tpl-empty').html())();
          $('#pending-list').html(html);
          App.Animations.animateIn('#pending-list .empty-state');
        }
      } else {
        _.each(pending, function (t) { self._appendItem('#pending-list', t); });
        _.each(done, function (t) { self._appendItem('#done-list', t); });
        setTimeout(function () {
          App.Animations.staggerItems('#pending-list');
          setTimeout(function () { App.Animations.staggerItems('#done-list'); }, 80);
        }, 50);
      }
    },

    _matchTask: function (t) {
      var match = true;
      if (this.searchQuery.length > 0) {
        var q = this.searchQuery.toLowerCase();
        match = match && t.get('title').toLowerCase().indexOf(q) !== -1;
      }
      if (this.categoryFilter.length > 0) {
        match = match && t.get('category') === this.categoryFilter;
      }
      return match;
    },

    _bindQuickAdd: function () {
      var self = this;
      $('#form-quick-add').on('submit', function (e) {
        e.preventDefault();
        var title = $('#quick-title').val().trim();
        if (!title) return;
        self._showLoading();
        self.collection.create({ title: title }, {
          wait: true,
          success: function () {
            $('#quick-title').val('').focus();
            App.Views.Notify.success('Task created!');
          },
          error: function (m, xhr) {
            var msg = xhr.responseJSON ? xhr.responseJSON.error : 'Failed to create task';
            App.Views.Notify.error(msg);
          }
        });
      });
    },

    _bindFilterPills: function () {
      var self = this;
      $(document).on('click', '.filter-pill', function () {
        self.categoryFilter = $(this).data('category') || '';
        self.renderFilterPills();
        self.renderList();
      });
      $(document).on('click', '#clear-filter', function () {
        self.categoryFilter = '';
        self.renderFilterPills();
        self.renderList();
      });
    },

    _bindSearch: function () {
      var self = this;
      var $input = $('#search-input');
      var $clear = $('#search-clear');
      var debounceTimer = null;

      $input.on('input', function () {
        var val = $(this).val();
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          self.searchQuery = val;
          $clear.toggleClass('hidden', val.length === 0);
          self.renderList();
        }, 150);
      });

      $clear.on('click', function () {
        if (debounceTimer) clearTimeout(debounceTimer);
        $input.val('');
        self.searchQuery = '';
        $clear.addClass('hidden');
        self.renderList();
        $input.focus();
      });
    },

    _showLoading: function () {
      var html = Handlebars.compile($('#tpl-loading').html())();
      $('#progress-region').after(html);
    },

    _appendItem: function (region, model) {
      var view = new App.Views.TaskItem({ model: model });
      $(region).append(view.render().el);
    }
  });

})();
