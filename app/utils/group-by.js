var get = Ember.get;

export default function(groupBy, property) {
  if (!property) property = 'content';

  var dependentKey = property + '.@each.' + groupBy;

  return Ember.computed(dependentKey, function(){
    var result = [];

    this.get(property).forEach(function(item){
      console.log(item.get('town'));
      var hasGroup = !!result.findBy('group', get(item, groupBy));

      if (!hasGroup) {
        result.pushObject(Ember.Object.extend({
          group: get(item, groupBy),
          content: [],
          multiple: function() {
            var content = this.get('content').length;
            if (content > 1) {
              return true;
            } else {
              return false;
            }
          }.property('content')
        }).create());
      }

      result.findBy('group', get(item, groupBy)).get('content').pushObject(item);
    });
    return result;
  });
}
