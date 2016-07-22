import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    openModal() {
      this.$('.ui.modal').modal('show');
    }
  }
});
