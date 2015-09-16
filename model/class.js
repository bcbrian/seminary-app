//Classes
Classes = new Mongo.Collection("Classes");

Classes.allow({
  insert: function (userId, Class) {
    return userId && Class.owner === userId;
  },
  update: function (userId, Class, fields, modifier) {
    if (userId !== Class.owner)
      return false;

    return true;
  },
  remove: function (userId, Class) {
    if (userId !== Class.owner)
      return false;

    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish('ownerCandidates', function(){
    return Candidates.find({owner: this.userId});
  });
  Meteor.publish('allClasses', function(jobId){
    return Classes.find({});
  });
}
