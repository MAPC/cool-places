import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('places', function() {
    this.route('place', { path: ':place_id' });
    this.route('nearby');
  });
});

export default Router;
