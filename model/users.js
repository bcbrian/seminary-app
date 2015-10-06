
Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    if (userId === user.owner || Meteor.call('isTeacher', userId, user._id))
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
  isTeacher: function(teacherId, studentId){

        console.log('ASKING IF TEACHER: ', teacherId);
        console.log('ASKING IF STUDENT: ', studentId);
        var classes = Classes.find({'owner':teacherId}).fetch();
        var student = Meteor.users.find({'_id':studentId}).fetch();
        console.log('CLASSES: ', JSON.stringify(classes[0]));
        console.log('STUDENT: ', JSON.stringify(student[0]));
        if(classes[0].name === student[0].profile.class.name){
          return true;
        }else{
          return false;
        }



  }
});
