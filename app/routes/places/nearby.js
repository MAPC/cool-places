import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  mapRouter: Ember.inject.service(),
  nearestMax: 5,
  userLocation: [42.426092,-70.927705],
  model(params) {
    return this.get('store').findAll('place');
  },

  setupController: function(controller, model) {
    let geojson = [];
    let models = model || [];

    models.forEach((model, index) => {
      geojson.push({
        type: model.get('type'),
        geometry: model.get('geometry'),
        properties: model.get('properties')
      });
      geojson[index].properties.model_id = parseInt(model.get('id'));
    });
    
    this.set('geojson', L.geoJson(geojson));
    controller.set('model', model);
    this.getUserLocation();
  },

  nearest: function() {
    var mapRouter = this.get('mapRouter');
    var geojson = this.get('geojson');
    var nearby = this.getNearbyPlaces(geojson);
    var markersArray = nearby.map((marker) => {
      return marker.layer;
    });
    
    var nearestIDs = markersArray.map((marker) => {
      return marker.feature.properties.model_id;
    });

    nearestIDs.forEach((id) => {
      this.store.peekRecord('place', id).set('nearby', true);
    });

    var nearestMarkers = L.featureGroup(markersArray).getBounds();

    mapRouter.set('bounds', nearestMarkers);

    return L.featureGroup(markersArray).getBounds();
  }.observes('userLocation'),

  getNearbyPlaces(geojson) {
    var index = leafletKnn(geojson);
    var nearestMax = this.get('nearestMax');
    var nearest = index.nearest(L.latLng(this.get('userLocation')), nearestMax);
    return nearest;
  },

  getUserLocation: function() {
    this.get('geolocation').getLocation().then((geoObject) => {
      var currentLocation = this.get('geolocation').get('currentLocation');
      this.set('userLocation', currentLocation);
    });
  }
});
