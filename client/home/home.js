angular.module("myApp")
.controller("HomeCtrl", ["$scope", "$rootScope", "$state", "$meteor", function($scope, $rootScope, $state, $meteor){
  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.user={
    email:"",
    password:"",
    profile:{
      type:"company"
    }
  };

  $scope.verifyPassword = "";
  var user = $meteor.requireUser();
  user.then(
    function(){
      $state.go(user.$$state.value.profile.type);
    }
  );

  $scope.signingIn = function (){
    $meteor.loginWithPassword($scope.user.email, $scope.user.password).then(
      function(){
        $scope.gotLoggedInPage();
      },function(error){
        if(error.error === 400 || error.error === 403){
          $scope.alerts.push({"type":"danger","msg":"Sorry, that user name and/or password does not work."});
        }else{
          $scope.alerts.push({"type":"danger","msg":error.message});
        }
      }
    );
  };
  
  $scope.comparePasswords = function(){
    if($scope.user.password === $scope.verifyPassword)
      $scope.passwordVerified = true;
    else{
      $scope.alerts.push({"type":"danger","msg":"Sorry, your passwords did not match."});
      $scope.passwordEntered = false;
    }
  };

  $scope.signingUp = function (){
    $meteor.createUser($scope.user).then(
      function(){

        var user = $meteor.requireUser();
        user.then(function(){
          $meteor.call("userUpdateProfile", $scope.user.profile);
          $scope.gotLoggedInPage();
        });

      },function(error){
        $scope.alerts.push({"type":"danger","msg":"Sorry, we failed to created your account and log you in."});
        console.log("failed", error);
      }
    );
  };

  $scope.gotLoggedInPage = function (){
    var user = $meteor.requireUser();
    user.then(
      function(){
        $state.go(user.$$state.value.profile.type);
      },
      function(error){
          alert(error);
      }
    );
  };
}]);
