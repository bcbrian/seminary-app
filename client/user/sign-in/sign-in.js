angular.module("myApp")
.controller("SignInCtrl", ["$scope", "$rootScope", "$state", "$meteor", function($scope, $rootScope, $state, $meteor){
  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.user={
    email:"",
    password:""
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

  $scope.gotLoggedInPage = function (){
    var user = $meteor.requireUser();
    user.then(
      function(){
        var goto = user.$$state.value.profile.type === 'president' ? 'student': user.$$state.value.profile.type;
        $state.go(goto);
      },
      function(error){
          alert(error);
      }
    );
  };
}]);
