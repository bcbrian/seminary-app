Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});
Meteor.publish("user", function (userId) {
  return Meteor.users.find({userId:userId}, {fields: {emails: 1, profile: 1}});
});
Meteor.publish("userEmail", function (userId) {
  return Meteor.users.find({userId:userId}, {fields: {emails: 1}});
});
Meteor.publish("myStudents", function (className) {
  return Meteor.users.find({'profile.type':{'$not':{'$eq':'teacher'}},'profile.class.name':className});
});
Meteor.publish("myRegularStudents", function (className) {
  return Meteor.users.find({'profile.type':'student','profile.class.name':className});
});
Meteor.publish("myPresidnetStudents", function (className) {
  return Meteor.users.find({'profile.type':'president','profile.class.name':className});
});
