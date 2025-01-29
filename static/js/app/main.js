;(function ($, _, Backbone, Handlebars) {

  $(function () {

    App.tasks = new App.Collections.TaskList();

    App.listView = new App.Views.TaskList();

    App.router = new App.Router();

    Backbone.history.start();

    App.router.navigate('', { trigger: true });

    $(document).on('keydown', function (e) {
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        $('#search-input').focus();
      }
      if (e.key === 'n' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        $('#quick-title').focus();
      }
    });

  });

})(jQuery, _, Backbone, Handlebars);
