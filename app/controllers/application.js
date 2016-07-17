import Ember from 'ember';

export default Ember.Controller.extend({
  geolocation: Ember.inject.service(),
	lat: 42.426092,
	lng: -70.927705,
	zoom: 12,
  userLocation: [42.426092,-70.927705],
  geojson: function() {
    let geojson = [];

    this.get('model').forEach((model) => {
      geojson.push({
        type: model.get('type'),
        geometry: model.get('geometry'),
        properties: model.get('properties')
      });
    });

    return geojson;
  }.property('model'),
  actions: {
    getUserLocation: function() {
      this.get('geolocation').getLocation().then((geoObject) => {
        var currentLocation = this.get('geolocation').get('currentLocation');
        this.set('userLocation', currentLocation);
        this.getNearbyPlaces();
      });
    }
  },
  getNearbyPlaces() {
    var index = leafletKnn(L.geoJson(this.get('geojson')));
    var nearest = index.nearest(L.latLng(this.get('userLocation')), 5, 10000);
    console.log(nearest);
    this.set('nearest', nearest);
  }
});
