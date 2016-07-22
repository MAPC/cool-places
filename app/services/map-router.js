import Ember from 'ember';

export default Ember.Service.extend({
  geolocation: Ember.inject.service(),
  bounds: null,
  center: [42.426092, -70.927705],
  zoom: 12,
  geojson: Ember.computed.map('places', function(place) {
    return L.geoJson(place.getProperties('type', 'geometry', 'properties'));
  }),
  nearestBounds: function() {
    var geojson = this.get('geojson');
    var nearby = this.getNearbyPlaces(geojson);
    var markersArray = nearby.map((marker) => {
      return marker.layer;
    });
    
    var nearestMarkers = L.featureGroup(markersArray).getBounds();

    mapRouter.set('bounds', nearestMarkers);

    return L.featureGroup(markersArray).getBounds();

    // definitely don't use this observer
  },

  getNearbyPlaces(geojson) {
    var index = leafletKnn(geojson);
    // make as a CONST in the component 
    var nearestMax = this.get('nearestMax');

    var nearest = index.nearest(L.latLng(this.get('geolocation.currentLocation')), nearestMax);
    return nearest;
  },
  nearest: function() {
    // alert("test");
  }
});
