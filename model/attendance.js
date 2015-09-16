//Attendances
Attendances = new Mongo.Collection("Attendances");

Attendances.allow({
  insert: function (userId, Attendance) {
    return userId && Attendance.owner === userId;
  },
  update: function (userId, Attendance, fields, modifier) {
    if (userId !== Attendance.owner)
      return false;

    return true;
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
  Meteor.publish('allAttendances', function(jobId){
    return Attendances.find({});
  });
}
