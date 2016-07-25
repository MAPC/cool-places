import DS from 'ember-data';

export default DS.CartoDBAdapter.extend({
  accountName: 'mapc-maps',
  tablePrefix: 'heatwaveapp',
  findAll: function(store, type) {
    var queryTpl = 'SELECT name, cartodb_id, ST_Simplify(the_geom,0.001) AS the_geom FROM {{table}}',
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
