import DS from 'ember-data';

export default DS.Model.extend({
  geometry: DS.attr(),
  properties: DS.attr(),
  type: DS.attr('string'),
  latitude: function() {
  	return this.get('geometry.coordinates')[1];
  }.property('geometry.coordinates.@'),
  longitude: function() {
  	return this.get('geometry.coordinates')[0];
  }.property('geometry.coordinates.@'),
  label: function() {
  	return this.get('properties.label');
  }.property('properties.label'),
  place_type: function() {
    return this.get('properties.type');
  }.property('properties.type'),
  nearby: DS.attr('boolean', { defaultValue: false }),
  address: function() {
    return this.get('properties.true_address');
  }.property('properties.true_address'),
  town: function() {
    return this.get('properties.town');
  }.property('properties.town'),
  phone: function() {
    return this.get('properties.phone');
  }.property('properties.phone'),
  name: function() {
    return this.get('properties.name');
  }.property('properties.name'),
  hours: function() {
    return this.get('properties.hours');
  }.property('properties.hours')
});
