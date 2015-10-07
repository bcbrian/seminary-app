
Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    if (userId === user.owner || Meteor.call('isTeacher', userId, user._id) || Meteor.call('isClassPresident', userId, user._id))
      return true;

    return false;
  }
});

Meteor.methods({
  userStatus: function (user) {
    user = user.$$state.value;
    if(!user || user === null || user === undefined || user === "AUTH_REQUIRED"){
      throw new Meteor.Error(404, "AUTH_REQUIRED");
    }else if(!user.profile){
  		throw new Meteor.Error(404, "NO_PROFILE");
  	}else if(!user.profile.isSetUp){
      throw new Meteor.Error(404, "PROFILE_UNDEFINED");
    }
  },
  userUpdateProfile: function (profile) {
    Meteor.users.update(Meteor.userId(), {$set : { profile: profile }});
  },
  isTeacher: function(presidentId, studentId){
    var president = Meteor.users.find({'_id':presidentId}).fetch();
    var student = Meteor.users.find({'_id':studentId}).fetch();

    if(president[0].profile.type === 'president' && president[0].profile.class.name === student[0].profile.class.name){
      return true;
    }else{
      return false;
    }
  }
});
