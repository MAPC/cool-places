import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['splash-portal'],
  classNameBindings: ['heat_alert:splash-portal-heat-warning']
});
