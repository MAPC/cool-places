import Ember from 'ember';

export default Ember.Route.extend({
  mapRouter: Ember.inject.service(),
  model() {
    return this.get('store').findAll('place');
  }, 
  setupController: function(controller, model) {
    this.get('mapRouter').set('model', model);
    controller.set('model', model);
  }
});
