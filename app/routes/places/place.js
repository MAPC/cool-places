import Ember from 'ember';

export default Ember.Route.extend({
  mapRouter: Ember.inject.service(),
  model(params) {
    
    
    return this.store.find('place', params.place_id).then((model) => {
      this.set('mapRouter.boundsOptions',  { maxZoom: 15, paddingBottomRight: [0,150] });
      return model;
    });
  },
  setupController(controller, model) {
    let geojson = [];
    let models = model || [];
    
    this.set('mapRouter.bounds', [[model.get('latitude'), model.get('longitude')], [model.get('latitude'), model.get('longitude')]] );
    controller.set('model', model);
    this.set('mapRouter.boundsOptions',  { maxZoom: 15, paddingBottomRight: [0,150] });
    console.log("Setting boundsOptions to padded");
    
  }
});
