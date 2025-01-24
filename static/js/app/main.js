;(function ($, _, Backbone, Handlebars) {

  $(function () {

    App.tasks = new App.Collections.TaskList();

    App.listView = new App.Views.TaskList();

    App.router = new App.Router();

    Backbone.history.start();

    App.router.navigate('', { trigger: true });
  });

})(jQuery, _, Backbone, Handlebars);
