angular.module("myApp")
.controller("RegisterCtrl", ["$scope", "$rootScope", "$state", "$meteor", function($scope, $rootScope, $state, $meteor){
  $scope.Classes = $meteor.collection(Classes, false);

  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.user={
    email:"",
    password:"",
    profile:{
      type:"teacher",
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
    if(!findClass.name){
      return true;
    }else{
      $scope.alerts.push({"type":"danger","msg":"Sorry, this class name is in use."});
      return false;
    }
  };

  $scope.signingUp = function (){
    console.log('this user is signing up', $scope.user);
    console.log('passwords? ',$scope.comparePasswords());
    console.log('valid class? ',$scope.validClass());
    if($scope.comparePasswords() && $scope.validClass()){
      $meteor.createUser($scope.user).then(
        function(){
          console.log('saved user');

            var user = $meteor.requireUser();
            user.then(function(){
              console.log('this user was created', user);
              $scope.Classes.save({name:$scope.user.profile.class.name,owner:user.$$state.value._id}).then(function(){
                console.log('saved class');
                console.log('updating user');
                $meteor.call("userUpdateProfile", $scope.user.profile);
                $scope.gotLoggedInPage();
            });
          }, function(error){
            //saving error
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
