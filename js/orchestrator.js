var Marionette = require('marionette');
var Backbone = require('backbone');
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

    // event listeners
    // on the collection
    var self = this;
    this.people.on('sync', function(){
      self.goToPersonByIndex(1);
    });
    // on the collection view
    this.peopleNavigation.on('person:selected', this.goToPersonById, this);
  },

  setSidebarArrowAndLargeViews: function(model){
    if (this.sidebar) {
      this.sidebar.destroy();
    }
    if (this.largeView) {
      this.largeView.destroy();
    }
    if(this.arrowView) {
      this.arrowView.destroy();
    }
    this.sidebar = new Views.SidebarView({model: model});
    this.layout.getRegion('sidebarRegion').show(this.sidebar);
    this.largeView = new Views.LargeView({model: model});
    this.layout.getRegion('largeViewRegion').show(this.largeView);
    this.arrowView = new Views.ArrowView({model: model});
    this.layout.getRegion('arrowsRegion').show(this.arrowView);
  },

  selectPersonInNavigation: function(person){
    this.peopleNavigation.children.each(function(view){
      // removing highlight class from all navigation items
      view.removeHighlight();
    });
    var view = this.peopleNavigation.children.findByModel(person);
    view.addHighlight();
  },

  goToPersonById: function(id){
    // check that the people collection actually has models
    if(this.people.length === 0) {
      return;
    }
    var person = this.people.get(id);
    // alert the user if the person with required id is absent from the collection
    if (!person) {
      alert('There is no such person in our database');
      return;
    }
    // change url
    this.updateUrl(id);
    // show person's data in the main area
    this.setSidebarArrowAndLargeViews(person);
    // highlight person in the navigation area
    this.selectPersonInNavigation(person);
    // change selectedIndex
    var index = this.people.indexOf(person);
    this.selectedIndex = index;
  },

  goToPersonByIndex: function(index){
    // find a person model
    var person = this.people.at(index);
    var id = person.get('id');
    // change url
    this.updateUrl(id);
    // show person's data in the main area
    this.setSidebarArrowAndLargeViews(person);
    // highlight person in the navigation area
    this.selectPersonInNavigation(person);
    // change selectedIndex
    this.selectedIndex = index;
      },

  updateUrl: function(id){
    var currentPath = window.location.hash;
    var currentId = currentPath.match(/#person\/(.*)/)[1];
    if (currentPath != id) {
      var path = 'person/' + id;
      Backbone.history.navigate(path);
    }
  }

});

module.exports = Orchestrator;
