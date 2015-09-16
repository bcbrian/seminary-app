angular.module('student.attendance',[
  'seminary.core'
]);

angular.module('student.attendance').config([
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
      .state('studentAttendance', {
        url: '/student/attendance',
        templateUrl: 'client/student/attendance/attendance.ng.html',
        controller: 'AttendanceCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      }).state('studentAttendanceLoading', {
        url: '/student/attendance-loading',
        templateUrl: 'client/student/attendance/attendanceLoading.ng.html',
        controller: 'AttendanceCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      });
  }]);
