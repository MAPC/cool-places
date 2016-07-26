import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      towns: this.store.findAll('town').then((towns) => {
        return towns.sortBy('name');
      }),
      weather: this.modelFor('application')
    })
  }
});
