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
  }
});
