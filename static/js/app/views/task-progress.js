;(function () {

  App.Views.Progress = Backbone.View.extend({

    tagName: 'div',

    template: Handlebars.compile($('#tpl-progress').html()),

    initialize: function () {
      this.listenTo(this.collection, 'reset add change destroy', this.render);
    },

    render: function () {
      var total   = this.collection.length;
      var pending = this.collection.pending().length;
      var done    = this.collection.done().length;
      var pct     = total === 0 ? 100 : Math.round((done / total) * 100);
      this.$el.html(this.template({
        total: total,
        pending: pending,
        done: done,
        percent: pct
      }));
      var bar = this.$el.find('.progress-fill')[0];
      if (bar) App.Animations.animateProgress(bar, pct);
      return this;
    }
  });

})();
