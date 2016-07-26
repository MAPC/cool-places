import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return new Ember.RSVP.hash({
      heat_alert: Ember.$.ajax({
          url: 'https://api.wunderground.com/api/7a00b70d60a1ac6b/alerts/q/MA/Boston.json', type: 'GET'
        }).then(function(response) { 
          let heat_advisory_status = false;
          if (response.alerts) {
            response.alerts.forEach((alert) => {  
              if (alert['type'] == "HEA") {
                heat_advisory_status = true;
              }
            });
          }
          return heat_advisory_status;
        }),
      forecast: Ember.$.ajax({
          url: 'https://api.wunderground.com/api/7a00b70d60a1ac6b/forecast/q/MA/Boston.json', type: 'GET'
        }).then(function(response) {
          return response.forecast.simpleforecast.forecastday[0].high.fahrenheit;
        }),
      current_temp: Ember.$.ajax({
          url: 'https://api.wunderground.com/api/7a00b70d60a1ac6b/conditions/q/MA/Boston.json', type: 'GET'
        }).then(function(response) {
          return response.current_observation.temp_f;
        })
    });
  }
});
