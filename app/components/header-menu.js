import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  recognizers: 'pan tap press',
  customEvents: {touchend: "click"},
  actions: {
    openModal() {
      this.$('.ui.modal').modal('show');
    }
  }
});
