import Ember from 'ember';

export default Ember.Route.extend({
  mapRouter: Ember.inject.service(),
  model(params) {
    return this.store.query('town', { name: params.town_name }).then((town) => {
      this.get('mapRouter').set('bounds',this.geojson(town).getBounds());
      return town.get('firstObject');
    });
  },
  geojson(model) {
    let geojson = [];
    model.forEach((model, index) => {
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
