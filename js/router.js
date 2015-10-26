var Marionette = require('marionette');

// Will use a common Marionette object (which I call orchestrator) as a controller,
// because Marionette controllers are deprecated

var Router = Marionette.AppRouter.extend({
  initialize: function(controller) {
    this.controller = controller;
    this.appRoutes = {
      'person/:id': 'goToPersonById'
    };
  }
});


module.exports = Router;
