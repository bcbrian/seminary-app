angular.module("myApp")
.controller("SignUpCtrl", ["$scope", "$rootScope", "$state", "$meteor", function($scope, $rootScope, $state, $meteor){
  $scope.Classes = $meteor.collection(Classes, false);

  $scope.$meteorSubscribe("allClasses").then(function (handle) {
    console.log('ready!');
  });

  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.user={
    email:"",
    password:"",
    profile:{
      type:"student",
      class:{
        name:"",
        id:""
      }
    }
  };

  $scope.verifyPassword = "";
  var user = $meteor.requireUser();
  user.then(
    function(){
      $state.go(user.$$state.value.profile.type);
    }
  );

  $scope.comparePasswords = function(){
    if($scope.user.password === $scope.verifyPassword)
      return true;
    else{
      $scope.alerts.push({"type":"danger","msg":"Sorry, your passwords did not match."});
      return false;
    }
  };

  $scope.validClass = function(){
    var findClass = $scope.$meteorObject(Classes, {name:$scope.user.profile.class.name}, false);
    console.log('findClass', findClass);
    if(findClass.name){
      $scope.user.profile.class.id  = findClass._id;
      return true;
    }else{
      $scope.alerts.push({"type":"danger","msg":"Sorry, this class name does not exist."});
      return false;
    }
  };

  $scope.signingUp = function (){
    console.log('sigining up');
    if($scope.comparePasswords() && $scope.validClass()){
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
    }
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
