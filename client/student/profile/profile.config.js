angular.module('student.profile',[
  'seminary.core'
]);

angular.module('student.profile').config([
  '$urlRouterProvider',
  '$stateProvider',
  '$locationProvider',
  function(
    $urlRouterProvider,
    $stateProvider,
    $locationProvider
  ){
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('studentProfile', {
        url: '/student/profile',
        templateUrl: 'client/student/profile/profile.ng.html',
        controller: 'StudentProfileCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        }
      });
  }]);
