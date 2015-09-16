Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});
Meteor.publish("user", function (userId) {
  return Meteor.users.find({userId:userId}, {fields: {emails: 1, profile: 1}});
});
Meteor.publish("userEmail", function (userId) {
  return Meteor.users.find({userId:userId}, {fields: {emails: 1}});
});
