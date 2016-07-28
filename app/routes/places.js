import Ember from 'ember';

const heat_alert_threshold = 90;

export default Ember.Route.extend({
  mapRouter: Ember.inject.service(),
  model(params) {
    var forecast = this.modelFor('application').forecast;
    return this.get('store').findAll('place').then((model) => {
      return model.filter((model) => {
        if (forecast < heat_alert_threshold) {
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
    controller.set('heat_alert_threshold', heat_alert_threshold);
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
