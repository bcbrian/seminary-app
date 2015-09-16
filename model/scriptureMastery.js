//ScriptureMasteries
ScriptureMasteries = new Mongo.Collection("ScriptureMasteries");

ScriptureMasteries.allow({
  insert: function (userId, ScriptureMastery) {
    return userId && ScriptureMastery.owner === userId;
  },
  update: function (userId, ScriptureMastery, fields, modifier) {
    if (userId !== ScriptureMastery.owner)
      return false;

    return true;
  },
  remove: function (userId, ScriptureMastery) {
    if (userId !== ScriptureMastery.owner)
      return false;

    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish('ownerScriptureMasteries', function(){
    return ScriptureMasteries.find({owner: this.userId});
  });
  Meteor.publish('allScriptureMasteries', function(jobId){
    return ScriptureMasteries.find({});
  });
}
