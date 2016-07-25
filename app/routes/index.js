import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('town').then((towns) => {
      return towns.sortBy('name');
    });
  }
});
