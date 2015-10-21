angular.module('class.attendance').filter('userName', [
  '$rootScope',
  function(
    $rootScope
  ){
    return function(id){
      if(!id) return undefined;
      var user = $rootScope.$meteorObject(Meteor.users, {_id:id}, false);
      var name =  user.profile.firstName ?
                  user.profile.firstName +' '+user.profile.lastName :
                  user.emails[0].address;
      return name;
    };
  }
]);
