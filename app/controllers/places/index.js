import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    viewPlace: function(place) {
      this.transitionToRoute('places.place', place);
    }
  },
  mapBounds: function() {
    return this.get('geojson').getBounds();  
  }.property('geojson'),
  geojson: function() {
    let geojson = [];

    this.get('model').forEach((model, index) => {
      geojson.push({
        type: model.get('type'),
        geometry: model.get('geometry'),
        properties: model.get('properties')
      });
      geojson[index].properties.model_id = parseInt(model.get('id'));
    });

    return L.geoJson(geojson);
  }.property('model'),
});
