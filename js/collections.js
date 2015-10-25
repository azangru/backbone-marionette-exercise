var Backbone = require('backbone');
var Person = require('./models').Person;

var People = Backbone.Collection.extend({
  model: Person,
  url: './mock-data/people.json'
});

exports.People = People;
