import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return new Ember.RSVP.hash({
      forecast: Ember.$.ajax({
          url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Boston%2C%20MA%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', type: 'GET'
        }).then(function(response) {
          return response.query.results.channel.item.forecast[0].high;
        }),
      current_temp: Ember.$.ajax({
          url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Boston%2C%20MA%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', type: 'GET'
        }).then(function(response) {
          return parseInt(response.query.results.channel.item.condition.temp);
        })
    });
  },
  actions: {
    back() {
      history.back();
    }
  }
});
