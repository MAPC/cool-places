import Ember from 'ember';

const DEFAULT_MAX_PLACES = 6;

export default Ember.Component.extend({
  classNames: ['top-level'],
  maxPlaces: DEFAULT_MAX_PLACES,
  geojson: Ember.computed.map('places', function(place) {
    return L.geoJson(place.getProperties('type', 'geometry', 'properties'));
  })
});
