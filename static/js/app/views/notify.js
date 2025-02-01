;(function () {

  var template = Handlebars.compile($('#tpl-notify').html());

  App.Views.Notify = {};

  App.Views.Notify.success = function (msg) {
    App.Views.Notify._show(msg, 'success', 'fa-check-circle');
  };

  App.Views.Notify.error = function (msg) {
    App.Views.Notify._show(msg, 'danger', 'fa-exclamation-triangle');
  };

  App.Views.Notify._show = function (msg, type, icon) {
    var html = template({ message: msg, type: type, icon: icon });
    $('#notify-region').html(html);
    App.Animations.slideIn('#notify-region [role="alert"]', 'down');
    setTimeout(function () {
      var $alert = $('#notify-region [role="alert"]');
      if ($alert.length) {
        gsap.to($alert[0], { opacity: 0, y: -12, duration: 0.3, onComplete: function () { $alert.remove(); } });
      }
    }, 2500);
  };

})();
