;(function ($, _, Backbone, Handlebars) {

  $(function () {

    App.tasks = new App.Collections.TaskList();

    App.listView = new App.Views.TaskList();

    App.router = new App.Router();

    Backbone.history.start();

    App.router.navigate('', { trigger: true });

    // Theme
    (function () {
      var saved = localStorage.getItem('ordo-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (saved === 'dark' || (!saved && prefersDark.matches)) {
        document.documentElement.classList.add('dark');
      }
      prefersDark.addEventListener('change', function (e) {
        if (!localStorage.getItem('ordo-theme')) {
          document.documentElement.classList.toggle('dark', e.matches);
        }
      });
      $('#theme-toggle').on('click', function () {
        var isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('ordo-theme', isDark ? 'dark' : 'light');
      });
    }());

    // Command palette
    (function () {
      var $overlay = $('#command-palette-overlay');
      var $input = $('#cmd-input');
      var $results = $('#cmd-results');

      function openPalette() {
        $overlay.removeClass('hidden');
        $input.val('').focus();
        $results.find('.cmd-item').show();
      }

      function closePalette() {
        $overlay.addClass('hidden');
        $input.blur();
      }

      $(document).on('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          if ($overlay.hasClass('hidden')) openPalette();
          else closePalette();
        }
      });

      $overlay.on('click', function (e) {
        if (e.target === this) closePalette();
      });

      $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && !$overlay.hasClass('hidden')) {
          closePalette();
        }
      });

      $results.on('click', '.cmd-item', function () {
        var action = $(this).data('action');
        closePalette();
        switch (action) {
          case 'focus-search': $('#search-input').focus(); break;
          case 'add-task':     $('#quick-title').focus(); break;
          case 'toggle-theme': $('#theme-toggle').click(); break;
          case 'go-home':      Backbone.history.navigate('', { trigger: true }); break;
        }
      });

      $input.on('input', function () {
        var q = $(this).val().toLowerCase();
        $results.find('.cmd-item').each(function () {
          var $item = $(this);
          var text = $item.find('span').text().toLowerCase();
          $item.toggle(text.indexOf(q) !== -1);
        });
      });

      $input.on('keydown', function (e) {
        var $visible = $results.find('.cmd-item:visible');
        if (e.key === 'Enter') {
          if ($visible.length) $visible.first().click();
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          var idx = $visible.index($visible.filter('[data-selected]'));
          $visible.removeAttr('data-selected');
          var next = idx < $visible.length - 1 ? idx + 1 : 0;
          $visible.eq(next).attr('data-selected', 'true');
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          var idx = $visible.index($visible.filter('[data-selected]'));
          $visible.removeAttr('data-selected');
          var prev = idx > 0 ? idx - 1 : $visible.length - 1;
          $visible.eq(prev).attr('data-selected', 'true');
        }
      });
    }());

    // Confetti
    App.confetti = function () {
      var canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var count = 180;
      var pieces = [];
      var colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316'];
      for (var i = 0; i < count; i++) {
        pieces.push({
          x: Math.random() * canvas.width,
          y: -40 - Math.random() * 400,
          w: 4 + Math.random() * 8,
          h: 4 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 5,
          vy: 1.5 + Math.random() * 4,
          rot: Math.random() * 360,
          rv: (Math.random() - 0.5) * 8,
          opacity: 1
        });
      }
      var start = null;
      function animate(ts) {
        if (!start) start = ts;
        var elapsed = ts - start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var alive = false;
        for (var i = 0; i < pieces.length; i++) {
          var p = pieces[i];
          p.x += p.vx + Math.sin(elapsed * 0.002 + i) * 0.3;
          p.y += p.vy;
          p.vy += 0.05;
          p.rot += p.rv;
          if (elapsed > 2000) p.opacity = Math.max(0, p.opacity - 0.008);
          if (p.y < canvas.height + 60 && p.opacity > 0) {
            alive = true;
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
          }
        }
        if (alive) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    };

    // Keyboard shortcuts
    $(document).on('keydown', function (e) {
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        if (e.key === 'Escape') {
          e.target.blur();
          $('#search-clear').click();
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

    // Notify close
    $(document).on('click', '.notify-close', function () {
      $(this).closest('[role="alert"]').remove();
    });

  });

})(jQuery, _, Backbone, Handlebars);
