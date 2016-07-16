import DS from 'ember-data';

export default DS.Model.extend({
  geometry: DS.attr(),
  properties: DS.attr(),
  latitude: function() {
  	return this.get('geometry.coordinates')[1];
  }.property('geometry.coordinates.@'),
  longitude: function() {
  	return this.get('geometry.coordinates')[0];
  }.property('geometry.coordinates.@'),
  title: function() {
  	return this.get('properties.title');
  }.property('properties.title')
});
