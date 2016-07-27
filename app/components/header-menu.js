import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  recognizers: 'tap press',
  customEvents: {touchend: "click"},
  classNameBindings: ['mini:transparent-nav'],
  actions: {
    openModal() {
      this.$('.ui.modal').modal('show');
    }
  }
});
