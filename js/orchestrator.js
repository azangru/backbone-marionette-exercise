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
    this.sidebar = new Views.SidebarView({model: new Models.Person()});
    this.layout.getRegion('sidebarRegion').show(this.sidebar);
    this.largeView = new Views.LargeView({model: new Models.Person()});
    this.layout.getRegion('largeViewRegion').show(this.largeView);
    this.arrowView = new Views.ArrowView({model: new Models.Person()});
    this.layout.getRegion('arrowsRegion').show(this.arrowView);

    this.people.fetch();
    // by default, select the second element in collection (not relying on its id)
    this.selectedIndex = 1;

    // event listeners
    // on the collection
    var self = this;
    this.people.on('sync', this.goToPersonAfterCollectionSync, this);
    // on the collection view
    this.peopleNavigation.on('person:selected', this.goToPersonById, this);
    // on the arrow view
    this.arrowView.on('showPreviousPerson', this.goToPreviousPerson, this);
    this.arrowView.on('showNextPerson', this.goToNextPerson, this);
  },

  setSidebarArrowAndLargeViews: function(model){
    this.sidebar.model.set(model.attributes);
    this.sidebar.render();
    this.largeView.model.set(model.attributes);
    this.largeView.render();
    this.arrowView.model.set(model.attributes);
    this.arrowView.render();
  },

  selectPersonInNavigation: function(person){
    this.peopleNavigation.children.each(function(view){
      // removing highlight class from all navigation items
      view.removeHighlight();
    });
    var view = this.peopleNavigation.children.findByModel(person);
    view.addHighlight();
  },

  goToPersonAfterCollectionSync: function() {
    // check whether the url already contains a valid id
    var currentPath = window.location.hash;
    var personId = currentPath.match(/#person\/(.*)/) ? currentPath.match(/#person\/(.*)/)[1] : null;
    // if it does and if a person with this id exists in the collection, show that person
    if (personId && this.people.get(personId)){
      this.goToPersonById(personId);
    } else {
      // otherwise select the second person in the nav block
      this.goToPersonByIndex(1);
    }
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

  goToPreviousPerson: function(){
    var currentIndex = this.selectedIndex;
    if (currentIndex - 1 < 0) {
      return;
    }
    this.goToPersonByIndex(currentIndex - 1);
  },

  goToNextPerson: function(){
    var currentIndex = this.selectedIndex;
    if (currentIndex + 1 >= this.people.length) {
      return;
    }
    this.goToPersonByIndex(currentIndex + 1);
  },

  updateUrl: function(id){
    var currentPath = window.location.hash;
    var idPart = currentPath.match(/#person\/(.*)/);
    if (idPart) {
      var currentId = idPart[1];
    }
    if (!idPart || currentId != id) {
      var path = 'person/' + id;
      Backbone.history.navigate(path);
    }
  }

});

module.exports = Orchestrator;
