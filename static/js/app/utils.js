// Ordo utility functions
var OrdoUtils = {
  formatDate: function(d) { return new Date(d).toLocaleDateString(); },
  capitalize: function(s) { return s.charAt(0).toUpperCase() + s.slice(1); },
  truncate: function(s, n) { return s.length > n ? s.slice(0, n) + '...' : s; }
};
