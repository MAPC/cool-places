import Ember from 'ember';

export default Ember.Controller.extend({
  geolocation: Ember.inject.service(),
  actions: {
    toTown(component, id, value) {
      this.transitionToRoute('places.towns.town', value)

    }
  }
});
