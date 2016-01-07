angular.module('student',[
  'seminary.core'
]);

angular.module('student').config([
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
      .state('student', {
        url: '/student',
        templateUrl: 'client/student/student.ng.html',
        controller: 'StudentCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }],
          'announcements':['ClassAnnouncementsService',function(ClassAnnouncementsService){
            console.log('2');
            return ClassAnnouncementsService.getAnnouncements();
          }]
        }
      })
      .state('studentLoading', {
        url: '/student-loading',
        templateUrl: 'client/student/studentLoading.ng.html',
        controller: 'StudentCtrl',
        resolve: {
            "currentUser": ["$meteor", function($meteor){
                return $meteor.requireUser();
            }]
        }
      });
  }]);
