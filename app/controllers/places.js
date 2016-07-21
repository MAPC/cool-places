import Ember from 'ember';

export default Ember.Controller.extend({
  mapRouter: Ember.inject.service(),
  geolocation: Ember.inject.service(),
  // userLocation: [42.426092,-70.927705],
  classNames: ['main-content'],
  callOutMarker: function() {
    return L.icon({
      iconUrl: 'marker-icon-red.png',
      iconRetinaUrl: 'marker-icon-red.png',
      iconSize: [25, 41]
    });
    
  }.property(),

  actions: {

    viewPlace: function(place) {
      this.transitionToRoute('places.place', place);
    }
  },

  center: function() {
    return this.get('mapRouter.center');
  }.property('mapRouter.center'),
  zoom: function() {
    return this.get('mapRouter.zoom');
  }.property('mapRouter.zoom'),

  mapBounds: function() {
    // console.log(this.get('mapRouter.bounds'));
    // if (!this.get('nearest')) {
    //   return this.get('geojson').getBounds();  
    // } else {
    //   return this.get('nearestMarkersFeatureGroup').getBounds();
    // }
    console.log(this.get('mapRouter.bounds'));
    return this.get('mapRouter.bounds');
  }.property('mapRouter.bounds'),

  // geojson: function() {
  //   let geojson = [];

  //   this.get('model').forEach((model, index) => {
  //     geojson.push({
  //       type: model.get('type'),
  //       geometry: model.get('geometry'),
  //       properties: model.get('properties')
  //     });
  //     geojson[index].properties.model_id = parseInt(model.get('id'));
  //   });

  //   return L.geoJson(geojson);
  // }.property('model'),

  // nearestMarkersFeatureGroup: function() {
  //   var nearest = this.get('nearest');
  //   var markersArray = nearest.map((marker) => {
  //     return marker.layer;
  //   });
    
  //   var nearestIDs = markersArray.map((marker) => {
  //     return marker.feature.properties.model_id;
  //   });

  //   nearestIDs.forEach((id) => {
  //     this.store.peekRecord('place', id).set('nearby', true);
  //   });

  //   return L.featureGroup(markersArray);
  // }.property('nearest'),

  // geoJsonIndex: function() {
  //   return leafletKnn(this.get('geojson'));
  // }.property('this.geojson'),

  // getNearbyPlaces() {
  //   var index = this.get('geoJsonIndex');
  //   var nearestMax = this.get('nearestMax');
  //   var nearest = index.nearest(L.latLng(this.get('userLocation')), nearestMax);
  //   console.log(nearest);
  //   this.set('nearest', nearest);
  // }
});
