;(function () {

  App.Views.TaskList = Backbone.View.extend({

    el: '#app',

    template: Handlebars.compile($('#tpl-app').html()),

    searchQuery: '',

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

    renderList: function () {
      var pending = this.collection.pending();
      var done    = this.collection.done();
      var filtered = this.searchQuery.length > 0;

      if (filtered) {
        var q = this.searchQuery.toLowerCase();
        pending = _.filter(pending, function (t) {
          return t.get('title').toLowerCase().indexOf(q) !== -1;
        });
        done = _.filter(done, function (t) {
          return t.get('title').toLowerCase().indexOf(q) !== -1;
        });
      }

      var listHtml = Handlebars.compile($('#tpl-task-list').html())({
        pendingCount: pending.length,
        doneCount: done.length
      });
      $('#list-region').html(listHtml);

      var self = this;
      if (pending.length === 0 && done.length === 0) {
        if (filtered) {
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

    _bindSearch: function () {
      var self = this;
      var $input = $('#search-input');
      var $clear = $('#search-clear');

      $input.on('input', function () {
        self.searchQuery = $(this).val();
        $clear.toggleClass('hidden', self.searchQuery.length === 0);
        self.renderList();
      });

      $clear.on('click', function () {
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
