//Readings
Readings = new Mongo.Collection("Readings");

Readings.allow({
  insert: function (userId, Reading) {
    return userId && Reading.owner === userId;
  },
  update: function (userId, Reading, fields, modifier) {
    if (userId !== Reading.owner)
      return false;

    return true;
  },
  remove: function (userId, Reading) {
    if (userId !== Reading.owner)
      return false;

    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish('ownerReadings', function(){
    return Readings.find({owner: this.userId});
  });
  Meteor.publish('allReadings', function(jobId){
    return Readings.find({});
  });
}
