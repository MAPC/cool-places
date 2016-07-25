import Ember from 'ember';

// fetching data
// receiving actions
// updating data

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  mapRouter: Ember.inject.service(),

  nearestMax: 5,
  // userLocation: [42.426092,-70.927705],
  model(params) {
    let places = this.modelFor('places');
    let mapRouter = this.get('mapRouter');

    if(this.get('geolocation.currentLocation')) {
      var currentLocation = this.get('geolocation.currentLocation');
    } else {
      var currentLocation = this.get('geolocation').getLocation().then((object) => {
      }, (error) => { 
                      alert("Location services disabled"); 
                      this.transitionTo('index'); 
                      this.get('geolocation').set('disabled', true);
                    });  
    }
    
    return Ember.RSVP.hash({
      places,
      currentLocation
    });
    // this.get('geolocation').getLocation(); 
    // RSVP hash sets up the promisees for the model AND the get location property
    // The template and leaflet won't update until the promises are resolved
    // return this.get('store').findAll('place');

  },

  setupController: function(controller, model) {
    let geojson = [];
    // let model = this.modelFor('places');
    // let models = model || [];

    // reshape data in the component - move to a component 
    // Ember computed map 

     // move into a component
    model.places.forEach((model, index) => {
      geojson.push({
        type: model.get('type'),
        geometry: model.get('geometry'),
        properties: model.get('properties')
      });
      geojson[index].properties.model_id = parseInt(model.get('id'));
    });
    
    this.set('geojson', L.geoJson(geojson));
    controller.set('model', model);
    this.nearest();
  },


  // live as compouted properties in the component 
  nearest: function() {
    var mapRouter = this.get('mapRouter');
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
    geojson.addData({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: this.get('geolocation.currentLocation') },
        properties: {}
      });
    var index = leafletKnn(geojson);
    // make as a CONST in the component 
    var nearestMax = this.get('nearestMax');

    var nearest = index.nearest(L.latLng(this.get('geolocation.currentLocation')), nearestMax);
    return nearest;
  }
});
