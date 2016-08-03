import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      towns: this.store.findAll('town').then((towns) => {
        return towns.sortBy('municipal');
      }),
      weather: this.modelFor('application')
    })
  }
});
