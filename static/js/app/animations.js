;(function () {

  var _queue = [];

  App.Animations = {

    animateIn: function (el, opts) {
      var $el = $(el);
      if (!$el.length) return;
      var duration = (opts && opts.duration) || 0.4;
      var delay = (opts && opts.delay) || 0;
      var vars = { opacity: 1, y: 0, duration: duration, delay: delay, ease: 'power2.out' };
      if (opts && opts.from === 'left') vars.x = 0;
      if (opts && opts.from === 'scale') { vars.scale = 1; vars.opacity = 1; }
      gsap.fromTo($el[0], { opacity: 0, y: 12 }, vars);
    },

    animateProgress: function (el, pct) {
      var $el = $(el);
      if (!$el.length) return;
      gsap.fromTo($el[0], { width: '0%' }, { width: pct + '%', duration: 0.7, ease: 'power2.out' });
    },

    staggerItems: function (container, delay) {
      var items = $(container).children();
      if (!items.length) return;
      gsap.fromTo(items, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.35,
        stagger: { each: 0.05, from: 'start' },
        ease: 'power2.out',
        delay: delay || 0
      });
    },

    slideIn: function (el, dir) {
      var $el = $(el);
      if (!$el.length) return;
      var fromY = dir === 'down' ? -20 : 20;
      gsap.fromTo($el[0], { opacity: 0, y: fromY }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    },

    scaleIn: function (el) {
      var $el = $(el);
      if (!$el.length) return;
      gsap.fromTo($el[0], { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.4)' });
    },

    pulse: function (el) {
      var $el = $(el);
      if (!$el.length) return;
      gsap.fromTo($el[0], { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });
    }
  };

})();
