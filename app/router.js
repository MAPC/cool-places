import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('places', function() {
    this.route('place', { path: ':place_id' });
    this.route('nearby');
    this.route('towns', function() {
      this.route('town', { path: ':town_name' });
    });
  });
});

export default Router;
