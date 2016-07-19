import Ember from 'ember';

export default Ember.Route.extend({
  mapRouter: Ember.inject.service(),
  model(params) {
    return this.store.find('place', params.place_id);
  }
});
