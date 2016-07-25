import DS from 'ember-data';

export default DS.CartoDBAdapter.extend({
  accountName: 'mapc-maps',
  tablePrefix: 'heatwaveapp'
});
