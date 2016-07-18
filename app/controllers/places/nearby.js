import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    viewPlace: function(place) {
      this.transitionToRoute('places.place', place);
    }
  },
  geolocation: Ember.inject.service(),

  userLocation: [42.426092,-70.927705],

  callOutMarker: function() {
    return L.icon({
      iconUrl: 'marker-icon-red.png',
      iconRetinaUrl: 'marker-icon-red.png',
      iconSize: [25, 41]
    });
    
  }.property(),
  nearestMax: 5,
  mapBounds: function() {
    return this.get('nearestMarkersFeatureGroup').getBounds();
  }.property('nearest'),

  geojson: function() {
    let geojson = [];

    this.get('model').forEach((model, index) => {
      geojson.push({
        type: model.get('type'),
        geometry: model.get('geometry'),
        properties: model.get('properties')
      });
      geojson[index].properties.model_id = parseInt(model.get('id'));
    });

    return L.geoJson(geojson);
  }.property('model'),

  nearestMarkersFeatureGroup: function() {
    this.getUserLocation();
    this.getNearbyPlaces();

    var nearest = this.get('nearest');
    var markersArray = nearest.map((marker) => {
      return marker.layer;
    });
    
    var nearestIDs = markersArray.map((marker) => {
      return marker.feature.properties.model_id;
    });

    nearestIDs.forEach((id) => {
      this.store.peekRecord('place', id).set('nearby', true);
    });

    return L.featureGroup(markersArray);
  }.property('nearest'),

  geoJsonIndex: function() {
    return leafletKnn(this.get('geojson'));
  }.property('this.geojson'),

  getUserLocation: function() {
    this.get('geolocation').getLocation().then((geoObject) => {
      var currentLocation = this.get('geolocation').get('currentLocation');
      this.set('userLocation', currentLocation);
    });
  },

  getNearbyPlaces() {
    var index = this.get('geoJsonIndex');
    var nearestMax = this.get('nearestMax');
    var nearest = index.nearest(L.latLng(this.get('userLocation')), nearestMax);
    console.log(nearest);
    this.set('nearest', nearest);
  }
});
