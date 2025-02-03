;(function () {

  App.Models.Task = Backbone.Model.extend({
    urlRoot: '/api/tasks',

    defaults: {
      title: '',
      description: '',
      status: 'pending',
      priority: 0,
      category: 'general',
      due_date: ''
    },

    toggle: function () {
      this.save({ status: this.get('status') === 'done' ? 'pending' : 'done' }, { patch: true });
    }
  });

  App.Collections.TaskList = Backbone.Collection.extend({
    url: '/api/tasks',
    model: App.Models.Task,

    comparator: function (task) {
      var priority = task.get('priority');
      var created = new Date(task.get('created_at')).getTime();
      return -(priority * 10000000000000 + created);
    },

    byStatus: function (status) {
      return this.filter(function (task) {
        return task.get('status') === status;
      });
    },

    pending: function () {
      return this.byStatus('pending');
    },

    done: function () {
      return this.byStatus('done');
    },

    progress: function () {
      var total = this.length;
      if (total === 0) return 100;
      return Math.round((this.done().length / total) * 100);
    }
  });

})();
