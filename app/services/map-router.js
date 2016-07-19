import Ember from 'ember';

export default Ember.Service.extend({
  bounds: function() {
    return this.get('geojson').getBounds();
  }.property('geojson'),
  _model: function() {
    return this.get('model');
  }.property('model'),
  geojson: function() {
    let geojson = [];
    let models = this.get('_model') || [];
    
    models.forEach((model, index) => {
      geojson.push({
        type: model.get('type'),
        geometry: model.get('geometry'),
        properties: model.get('properties')
      });
      geojson[index].properties.model_id = parseInt(model.get('id'));
    });

    return L.geoJson(geojson);
  }.property('_model')
});
