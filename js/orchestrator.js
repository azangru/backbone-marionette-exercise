var Marionette = require('marionette');
var Models = require("./models.js");
var People = require('./collections').People;
var Views = require("./views.js");

var Orchestrator = Marionette.Object.extend({
  initialize: function(layout) {
    this.layout = layout;
    this.people = new People();
    this.peopleNavigation = new Views.NavigationView({collection: this.people});
    this.layout.getRegion('peopleRegion').show(this.peopleNavigation);
    this.people.fetch();
    // by default, select the second element in collection (not relying on its id)
    this.selectedIndex = 1;

    // put some event listeners on the collection
    var self = this;
    this.people.on('sync', function(){
      var currentModel = self.people.at(self.selectedIndex);
      self.setSidebarAndLargeViews(currentModel);
    });
  },

  setSidebarAndLargeViews: function(model){
    if (this.sidebar) {
      this.sidebar.destroy();
    }
    if (this.largeView) {
      this.largeView.destroy();
    }
    this.sidebar = new Views.SidebarView({model: model});
    this.layout.getRegion('sidebarRegion').show(this.sidebar);
    this.largeView = new Views.LargeView({model: model});
    this.layout.getRegion('largeViewRegion').show(this.largeView);
  },

});

module.exports = Orchestrator;
