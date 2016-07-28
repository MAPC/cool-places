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
    return this.get('mapRouter.bounds');
  }.property('mapRouter.bounds'),
  fitBoundsOptions: function() {
    console.log(this.get('mapRouter.boundsOptions'));
    return this.get('mapRouter.boundsOptions');
  }.property('mapRouter.boundsOptions'),

  basicMarkerOptions: function(url) {
    return L.icon({
      iconUrl: url,
      iconAnchor: [25,50],
      iconSize: [50,51],
      shadowUrl: 'assets/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 38]
    });
  },

  beach:     function() { return this.basicMarkerOptions("Map-icons-50x50-Beach-01.png") }.property(),
  heat:      function() { return this.basicMarkerOptions("Map-icons-50x50-heat-01.png") }.property(),
  library:   function() { return this.basicMarkerOptions("Map-icons-50x50-Library-01.png") }.property(),
  park:      function() { return this.basicMarkerOptions("Map-icons-50x50-park-01.png") }.property(),
  pool:      function() { return this.basicMarkerOptions("Map-icons-50x50-Pool-01.png") }.property(),
  sprayDeck: function() { return this.basicMarkerOptions("Map-icons-50x50-SprayDeck-01.png") }.property(),
  wading:    function() { return this.basicMarkerOptions("Map-icons-50x50-Wading-01.png") }.property(),
  waterPlay: function() { return this.basicMarkerOptions("Map-icons-50x50-WaterPlay-01.png") }.property()
});
