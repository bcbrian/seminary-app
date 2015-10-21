Devotionals = new Mongo.Collection('Devotionals');

Devotionals.allow({
  insert: function (userId, Devotional) {
    return(
      userId &&
      Devotional.owner === Meteor.call('getClassId') &&
      (
        Meteor.call('isThisClassTeacher') ||
        Meteor.call('isThisClassPresident')
      )
    );
  },
  update: function (userId, Devotional, fields, modifier) {
    if (
      Devotional.owner === Meteor.call('getClassId') &&
      (
        Meteor.call('isThisClassTeacher') ||
        Meteor.call('isThisClassPresident')
      )
    ){
      return true;
    }

    return false;
  },
  remove: function (userId, Devotional) {
    if (
      Devotional.owner === Meteor.call('getClassId') &&
      (
        Meteor.call('isThisClassTeacher') ||
        Meteor.call('isThisClassPresident')
      )
    ){
      return true;
    }

    return false;
  }
});

if (Meteor.isServer) {
  Meteor.publish('allDevotionals', function(classId){
    // var classId = Meteor.call('getClassId');
    return Devotionals.find({owner:classId});
  });

}
