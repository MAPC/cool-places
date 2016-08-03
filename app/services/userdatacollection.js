import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  sendData: function(geo_object) {
    console.log(geo_object, config);
    var geojson = {
                      "type":"Point",
                      "coordinates":[geo_object.coords.longitude,geo_object.coords.latitude] 
                     };

    var sql = "SELECT osm2_upsert_heatwaveapp_userdata(ARRAY[-1], ARRAY['" + JSON.stringify(geojson) + "'])";

    if (config.datacollection) {
      this.get('ajax').request('//mapc-maps.cartodb.com/api/v2/sql',{
        type: 'POST',
        crossDomain: true,
        data: {"q":sql},
        dataType: 'json',
        success: function() {
          console.log("Data saved");
        },
        error: function () {
          console.log("Problem saving the data");
        }
      });
    }
  }
});
