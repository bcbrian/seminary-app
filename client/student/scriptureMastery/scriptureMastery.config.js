angular.module('student.scriptureMastery',[
  'seminary.core'
]);

angular.module('student.scriptureMastery').config([
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
      .state('studentScriptureMastery', {
        url: '/student/scripture-mastery',
        templateUrl: 'client/student/scriptureMastery/scriptureMastery.ng.html',
        controller: 'ScriptureMasteryCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
          }],
          'scriptureMasteries': ['ScriptureMasteryService', function(ScriptureMasteryService){
            return ScriptureMasteryService.getScriptureMasteries();
          }]
        }
      });
  }]);
