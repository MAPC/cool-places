import DS from 'ember-data';

export default DS.CartoDBAdapter.extend({
  accountName: 'mapc-maps',
  tablePrefix: 'heatwaveapp',
  findAll: function(store, type) {
    var queryTpl = 'SELECT heatwaveapp_towns.name, heatwaveapp_towns.cartodb_id, ST_Simplify(heatwaveapp_towns.the_geom,0.001), heatwaveapp_places.the_geom AS the_geom FROM {{table}}, heatwaveapp_places WHERE ST_Intersects(heatwaveapp_towns.the_geom, heatwaveapp_places.the_geom)',
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
