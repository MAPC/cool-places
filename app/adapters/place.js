import DS from 'ember-data';

export default DS.CartoDBAdapter.extend({
  accountName: 'mapc-maps',
  tablePrefix: 'heatwaveapp',
  findAll: function(store, type) {
    var queryTpl = 'SELECT * FROM heatwaveapp_places WHERE the_geom IS NOT NULL',
        url = this.buildURL(type, queryTpl),
        response = {};

    return this.ajax(url + '&format=geojson', 'GET').then(function(featureColl) {
      response[type.typeKey.pluralize()] = featureColl.features.map(function(feature) {
        feature.id = feature.properties.cartodb_id;
        return feature;
      });
      return response;
    });
  }
});
