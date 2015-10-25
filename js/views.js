var Marionette = require('marionette');
// var _ = require('underscore');
var Models = require('./models.js');

// Application layout
var LayoutView = Marionette.LayoutView.extend({
  tagName: 'main',
  template: require('../templates/layout.html'),

  regions: {
    sidebarRegion: '#sidebar',
    largeViewRegion: '#large-view',
    peopleRegion: '#people',
    arrowsRegion: '#arrows'
  }

  //onBeforeShow: function() {
    //this.getRegion('buttonsRegion').show(new ButtonsView());
  //}
});

// Navigation view
var NavigationItemView = Marionette.ItemView.extend({
  model: Models.Person,
  tagName: 'div',
  template: function(model) {
    return require('../templates/navItem.hbs')(model);
  }
});

var NavigationView = Marionette.CollectionView.extend({
  className: 'nav-items',
  childView: NavigationItemView
  //template: require('../templates/navigation.hbs')
});

var SidebarView = Marionette.ItemView.extend({
  model: Models.Person,
  template: function(model) {
    return require('../templates/sidebar.hbs')(model);
  }
});

var LargeView = Marionette.ItemView.extend({
  model: Models.Person,
  template: function(model) {
    return require('../templates/largeView.hbs')(model);
  }
});

module.exports = {
  LayoutView: LayoutView,
  NavigationView: NavigationView,
  NavigationItemView: NavigationItemView,
  SidebarView: SidebarView,
  LargeView: LargeView
};
