import Ember from 'ember';

// fetching data
// receiving actions
// updating data

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  mapRouter: Ember.inject.service(),
  userdatacollection: Ember.inject.service(),

  nearestMax: 7,
  model(params) {
    let places = this.modelFor('places');
    let mapRouter = this.get('mapRouter');

    if(this.get('geolocation.currentLocation')) {
      console.log("already have location");
      var currentLocation = this.get('geolocation.currentLocation');
    } else {
      var currentLocation = this.get('geolocation').getLocation().then((object) => {
        this.get('userdatacollection').sendData(object);
      }, (error) => { 
                      console.log(error);
                      alert("Location services disabled"); 
                      this.transitionTo('index'); 
                      this.get('geolocation').set('disabled', true);
                    });  
    }
    
    return Ember.RSVP.hash({
      places,
      currentLocation
    }).then((model) => { return model; });
    // this.get('geolocation').getLocation(); 
    // RSVP hash sets up the promisees for the model AND the get location property
    // The template and leaflet won't update until the promises are resolved
    // return this.get('store').findAll('place');

  },

  setupController: function(controller, model) {
    let geojson = [];
    console.log("Setting nearby");
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

  },

  getNearbyPlaces(geojson) {
    geojson.addData({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [this.get('geolocation.currentLocation')[1], this.get('geolocation.currentLocation')[0]] },
        properties: { }
      });
    console.log(geojson);
    var index = leafletKnn(geojson);
    // make as a CONST in the component 
    var nearestMax = this.get('nearestMax');

    var nearest = index.nearest(L.latLng(this.get('geolocation.currentLocation')), nearestMax);

    var markersArray = nearest.map((marker) => {
      return marker.layer;
    });
    
    var nearestIDs = markersArray.map((marker) => {
      console.log(marker);
      return marker.feature.properties.model_id;
    });

    nearestIDs.forEach((id) => {
      if(id) {
        this.store.peekRecord('place', id).set('nearby', true);  
      }
    });

    return nearest;
  }
});
