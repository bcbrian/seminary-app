angular.module('student.reading',[
  'seminary.core'
]);

angular.module('student.reading').config([
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
    .state('studentReading', {
      url: '/student/reading',
      templateUrl: 'client/student/reading/reading.ng.html',
      controller: 'ReadingCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }],
        'readings' : ['ReadingService', function(ReadingService){
          return ReadingService.getReadings();
        }]
      }
    });
  }]);
