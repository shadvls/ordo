;(function () {

  App.Views.TaskDetail = Backbone.View.extend({

    el: '#app',

    template: Handlebars.compile($('#tpl-task-detail').html()),

    events: {
      'submit #form-task-detail': 'save',
      'click .task-delete': 'deleteTask'
    },

    initialize: function () {
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'change', this.render);
      if (this.model.isNew()) {
        this.model.fetch();
      }
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      var el = this.$el.find('[class*="animate-scale-in"]')[0] || this.$el.find('.panel-detail, .bg-white')[0];
      if (el) App.Animations.scaleIn(el);
      return this;
    },

    save: function (e) {
      e.preventDefault();
      var $form = this.$('#form-task-detail');
      this.model.save({
        title: $form.find('[name="title"]').val().trim(),
        description: $form.find('[name="description"]').val().trim(),
        category: $form.find('[name="category"]').val(),
        priority: parseInt($form.find('[name="priority"]').val(), 10),
        status: $form.find('[name="status"]').is(':checked') ? 'done' : 'pending'
      }, {
        wait: true,
        success: function () {
          Backbone.history.navigate('', { trigger: true });
        }
      });
    },

    deleteTask: function () {
      if (confirm('Delete this task?')) {
        this.model.destroy({
          wait: true,
          success: function () {
            Backbone.history.navigate('', { trigger: true });
          }
        });
      }
    }
  });

})();
