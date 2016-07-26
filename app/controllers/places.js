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
  }.property('mapRouter.boundsOptions')
});
