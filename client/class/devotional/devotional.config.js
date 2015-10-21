angular.module('class.devotional',[
  'seminary.core'
]);

angular.module('class.devotional').config([
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
      .state('classDevotional', {
        url: '/:userType/devotionals',
        templateUrl: 'client/class/devotional/devotional.ng.html',
        controller: 'ClassDevotionalCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
          }],
          'devotionals':['ClassDevotionalService',function(ClassDevotionalService){
            return ClassDevotionalService.getDevotionals();
          }],
          'students':['StudentService', function(StudentService){
            return StudentService.getAllStudents();
          }]
        }
      });
  }]);
