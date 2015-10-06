angular.module("myApp")
.controller("StudentProfileCtrl", [
  "$scope",
  "$rootScope",
  "$meteor",
  "currentUser",
  function(
    $scope,
    $rootScope,
    $meteor,
    currentUser
  ){
  $scope.profile = currentUser.profile;
  $scope.updateProfile = function(){
    $scope.profile.isSetUp = true;
    $meteor.call("userUpdateProfile", $scope.profile);
  };
}]);
