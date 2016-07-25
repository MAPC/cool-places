import DS from 'ember-data';

export default DS.Model.extend({
  name: function() {
    return this.get('properties.name');
  }.property('properties.name'),
  geometry: DS.attr(),
  properties: DS.attr(),
  type: DS.attr('string')
});
