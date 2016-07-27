import Ember from 'ember';

export default Ember.Route.extend({
  mapRouter: Ember.inject.service(),
  model(params) {
    var forecast = this.modelFor('application').forecast;
    return this.get('store').findAll('place').then((model) => {
      return model.filter((model) => {
        if (forecast < 90) {
          return model.get('first_type') !== 'BCYF Cooling Center' && model.get('first_type') !== 'Cooling Center';  
        } else {
          return model;
        }
      })
    });
  },
  setupController: function(controller, model) {
    var geojson = this.geojson(model);
    var mapRouter = this.get('mapRouter');
    let heat_alert = this.modelFor('application').forecast
    mapRouter.set('bounds', geojson.getBounds());
    controller.set('model', model);
    controller.set('heat_alert', heat_alert);
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
  },
  actions: {
    back() {
      history.back();
    }
  }
});
