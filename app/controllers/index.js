import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.Controller.extend({
  geolocation: Ember.inject.service(),
  grouped: groupBy('municipal', 'content.towns'),
  actions: {
    toTown(component, id, value) {
      this.transitionToRoute('places.towns.town', id)
    }
  }
});
