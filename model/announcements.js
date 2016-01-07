Announcements = new Mongo.Collection('Announcements');

Announcements.allow({
  insert: function (userId, Announcement) {
    return(
      userId &&
      Announcement.owner === Meteor.call('getClassId') &&
      (
        Meteor.call('isThisClassTeacher') ||
        Meteor.call('isThisClassPresident')
      )
    );
  },
  update: function (userId, Announcement, fields, modifier) {
    if (
      Announcement.owner === Meteor.call('getClassId') &&
      (
        Meteor.call('isThisClassTeacher') ||
        Meteor.call('isThisClassPresident')
      )
    ){
      return true;
    }

    return false;
  },
  remove: function (userId, Announcement) {
    if (
      Announcement.owner === Meteor.call('getClassId') &&
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
  Meteor.publish('allAnnouncements', function(classId){
    // var classId = Meteor.call('getClassId');
    return Announcements.find({owner:classId});
  });

}
