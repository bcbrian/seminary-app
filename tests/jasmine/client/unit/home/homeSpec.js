describe('HomeCtrl', function() {
  beforeEach(module('recuitersWelcome'));
  var $controller;
  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));



  describe('$scope.user.profile.company', function() {
    it('initializes the $scope.user for sign in and sign up', function() {
      var $scope = {};
      var controller = $controller('HomeCtrl', { $scope: $scope });

      expect($scope.user.profile.type).toEqual('company');
    });
  });

  describe('$scope.comparePasswords()', function() {
    it('Verifies that passwords match', function() {
      var $scope = {};
      var controller = $controller('HomeCtrl', { $scope: $scope });

      $scope.user.password = "123456";
      $scope.verifyPassword = "123456";

      $scope.comparePasswords();

      expect($scope.passwordVerified).toEqual(true);
    });
  });

  describe('$meteor.requireUser()', function() {
    beforeEach(inject(function(_$q_, _$rootScope_, _$meteor_, _$state_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $q = _$q_;
      $rootScope = _$rootScope_;
      $meteor = _$meteor_;
      $state = _$state_;

      qServiceSpy = spyOn($meteor, 'requireUser').and.callFake(function () {
        var user = {
          profile:{
            type:"company"
          }
        };
        var d = $q.defer();
        d.resolve(user);
        return d.promise;
      });
      qServiceSpy = spyOn($state, 'go').and.callFake(function (type) {
        return true;
      });

    }));
    it('verifies that a user is logged in', function() {
      var $scope = {};
      var controller = $controller('HomeCtrl', { $scope: $scope });
      expect($meteor.requireUser).toHaveBeenCalled();
      $rootScope.$apply();
      expect($state.go).toHaveBeenCalled();
    });
  });
});
