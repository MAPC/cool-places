import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'splash-portal'],
  classNameBindings: ['heat_alert:splash-portal-heat-warning']
});
