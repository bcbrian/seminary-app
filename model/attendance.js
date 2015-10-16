Attendances = new Mongo.Collection('Attendances');

Attendances.allow({
  insert: function (userId, Attendance) {
    return userId && Attendance.owner === userId;
  },
  update: function (userId, Attendance, fields, modifier) {
    console.log('UPDATING...');
    if (userId === Attendance.owner || Meteor.call('isTeacher', userId, Attendance.owner) || Meteor.call('isClassPresident', userId, Attendance.owner))
      return true;

    return false;
  },
  remove: function (userId, Attendance) {
    if (userId !== Attendance.owner)
      return false;

    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish('ownerAttendances', function(){
    return Attendances.find({owner: this.userId});
  });
  Meteor.publish('studentAttendances', function(jobId){
    return Attendances.find({});
  });

}
