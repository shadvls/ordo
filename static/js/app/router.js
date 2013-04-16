;(function () {

  App.Router = Backbone.Router.extend({

    routes: {
      '':        'list',
      'task/:id': 'detail'
    },

    list: function () {
      App.tasks.fetch({ reset: true });
    },

    detail: function (id) {
      var task = App.tasks.get(id);
      if (!task) {
        task = new App.Models.Task({ id: id });
        task.fetch();
      }
      App.currentTask = task;
    }
  });

})();
