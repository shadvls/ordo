;(function () {

  App.Views.TaskItem = Backbone.View.extend({

    tagName: 'div',

    className: 'task-item-wrapper',

    events: {
      'change .task-toggle': 'toggle',
      'click .task-delete': 'deleteTask',
      'click [data-navigate]': 'navigate'
    },

    template: Handlebars.compile($('#tpl-task-item').html()),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
      var m = this.model;
      var priority = m.get('priority');
      var status = m.get('status');
      var done = status === 'done';
      var pClass = priority === 2 ? 'urgent' : priority === 1 ? 'high' : 'normal';
      var borderClass = '';
      if (pClass === 'urgent') borderClass = 'border-l-4 border-l-red-500';
      else if (pClass === 'high') borderClass = 'border-l-4 border-l-amber-400';
      var dueDate = m.get('due_date') || '';
      var dueOverdue = false;
      if (dueDate && !done) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var due = new Date(dueDate + 'T00:00:00');
        dueOverdue = due < today;
      }
      var created = m.get('created_at');
      var timeAgo = '';
      if (created) {
        var diff = Date.now() - new Date(created).getTime();
        var mins = Math.floor(diff / 60000);
        if (mins < 1) timeAgo = 'just now';
        else if (mins < 60) timeAgo = mins + 'm ago';
        else if (mins < 1440) timeAgo = Math.floor(mins / 60) + 'h ago';
        else timeAgo = Math.floor(mins / 1440) + 'd ago';
      }
      var data = {
        id: m.id,
        title: m.get('title'),
        category: m.get('category'),
        done: done,
        dueDate: dueDate,
        dueOverdue: dueOverdue,
        timeAgo: timeAgo,
        borderClass: borderClass,
        priorityClass: pClass,
        priorityLabel: priority === 2 ? 'Urgent' : priority === 1 ? 'High' : null
      };
      this.$el.html(this.template(data));
      if (done) this.$el.find('.task-item').addClass('opacity-75');
      var el = this.$el.find('.task-item')[0];
      if (el) App.Animations.animateIn(el);
      return this;
    },

    toggle: function () {
      this.model.toggle();
    },

    deleteTask: function (e) {
      e.stopPropagation();
      var model = this.model;
      var data = model.toJSON();
      model.destroy({ wait: true });
      App.Views.Notify.undo('Task deleted', function () {
        App.tasks.create(data, { wait: true, at: 0 });
      });
    },

    navigate: function (e) {
      e.preventDefault();
      Backbone.history.navigate('task/' + this.model.id, { trigger: true });
    }
  });

})();
