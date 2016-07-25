import Ember from 'ember';

export default Ember.Controller.extend({
  geolocation: Ember.inject.service(),
  actions: {
    toTown(component, id, value) {
      console.log(value);
      this.transitionToRoute('places.towns.town', value)

    }
  }
});
