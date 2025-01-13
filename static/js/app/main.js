;(function ($, _, Backbone, Handlebars) {

  var App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
  };

  window.App = App;

  $(function () {

    App.tasks = new App.Collections.TaskList();

    App.listView = new App.Views.TaskList();

    App.router = new App.Router();

    Backbone.history.start();

    App.router.navigate('', { trigger: true });
  });

})(jQuery, _, Backbone, Handlebars);
