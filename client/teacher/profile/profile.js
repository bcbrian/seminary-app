angular.module("myApp")
.controller("UserProfileCtrl", ["$scope", "$rootScope", "$meteor", function($scope, $rootScope, $meteor){
  $scope.profile = $rootScope.currentUser.profile;
  $scope.updateProfile = function(){
    $scope.profile.isSetUp = true;
    $meteor.call("userUpdateProfile", $scope.profile);
  };
}]);
