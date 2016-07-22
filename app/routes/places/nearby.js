import Ember from 'ember';

// fetching data
// receiving actions
// updating data

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  mapRouter: Ember.inject.service(),

  nearestMax: 5,
  userLocation: [42.426092,-70.927705],
  model(params) {
    // this.get('geolocation').getLocation(); 
    // RSVP hash sets up the promisees for the model AND the get location property
    // The template and leaflet won't update until the promises are resolved
    return this.get('store').findAll('place');

  },

  setupController: function(controller, model) {
    let geojson = [];
    // let models = model || [];

    // reshape data in the component - move to a component 
    // Ember computed map 

     // move into a component
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


  // live as compouted properties in the component 
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

    // definitely don't use this observer
  }.observes('userLocation'),

  getNearbyPlaces(geojson) {
    var index = leafletKnn(geojson);
    // make as a CONST in the component 
    var nearestMax = this.get('nearestMax');
    var nearest = index.nearest(L.latLng(this.get('userLocation')), nearestMax);
    return nearest;
  },


  // make this happen only once 
  // set this on the geolocation service as a property
  // just use the services currentLocation property directly when needed
  getUserLocation: function() {
    this.get('geolocation').getLocation().then((geoObject) => {
      var currentLocation = this.get('geolocation').get('currentLocation');
      this.set('userLocation', currentLocation);
    });
  }
});
