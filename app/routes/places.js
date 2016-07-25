import Ember from 'ember';

export default Ember.Route.extend({
  mapRouter: Ember.inject.service(),
  model(params) {
    return this.get('store').findAll('place');
  },
  // this.modelFor('places')
  setupController: function(controller, model) {
    var geojson = this.geojson(model);
    var mapRouter = this.get('mapRouter');
    mapRouter.set('bounds', geojson.getBounds());
    controller.set('model', model);
  },
  geojson: function(model) {
    let geojson = [];
    let models = model || [];

    models.forEach((model, index) => {
      geojson.push({
        type: model.get('type'),
        geometry: model.get('geometry'),
        properties: model.get('properties')
      });
      geojson[index].properties.model_id = parseInt(model.get('id'));
    });

    return L.geoJson(geojson);
  }
});
