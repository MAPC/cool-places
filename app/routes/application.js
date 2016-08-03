import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return new Ember.RSVP.hash({
      forecast: Ember.$.ajax({
          url: 'https://api.wunderground.com/api/d12cbfb547005953/forecast/q/MA/Boston.json', type: 'GET'
        }).then(function(response) {
          return response.forecast.simpleforecast.forecastday[0].high.fahrenheit;
        }),
      current_temp: Ember.$.ajax({
          url: 'https://api.wunderground.com/api/d12cbfb547005953/conditions/q/MA/Boston.json', type: 'GET'
        }).then(function(response) {
          return parseInt(response.current_observation.temp_f);
        })
    });
  },
  actions: {
    back() {
      history.back();
    }
  }
});
