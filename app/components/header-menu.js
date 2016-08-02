import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  recognizers: 'tap press',
  customEvents: {touchend: "click"},
  classNameBindings: ['mini:transparent-nav'],
  actions: {
    openModal(name) {
      this.$('.ui.' + name + '.modal').modal('show');
    }
  }
});
