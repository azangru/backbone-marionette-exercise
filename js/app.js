// Create application instance
var Marionette = require('marionette');
var app = new Marionette.Application();

// Configure regions
app.addRegions({
	body: 'body'
});

// Initialize controller on start
app.on('start', function() {
	// Initialize layout
	var Views = require('./views');
	var layout = new Views.LayoutView()
	app.getRegion('body').show(layout);

  // Create a people collection

  // Setup orchestrator
  var Orchestrator = require('./orchestrator');
  var orchestrator = new Orchestrator(layout);

	// Setup router
	var Router = require('./router');
	var router = new Router(orchestrator);

	//// Initialize history
	var Backbone = require('backbone');
	Backbone.history.start();
});

module.exports = app;
