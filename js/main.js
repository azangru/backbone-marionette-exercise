console.log('hello from main.js!');
require('../css/styles.scss');

// Initialize the app
var $ = require('jquery');

$(document).on('ready', function() {
    var app = require('./app');
    app.start();
});
