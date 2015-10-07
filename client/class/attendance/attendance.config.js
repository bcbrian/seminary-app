angular.module('class.attendance',[
  'seminary.core'
]);

angular.module('class.attendance').config([
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
      .state('classAttendance', {
        url: '/:userType/class-attendance',
        templateUrl: 'client/class/attendance/attendance.ng.html',
        controller: 'ClassAttendanceCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
          }],
          'attendances':['ClassAttendanceService',function(ClassAttendanceService){
            return ClassAttendanceService.getAttendances();
          }],
          'students':['StudentService', function(StudentService){
            return StudentService.getAllStudents();
          }]
        }
      });
  }]);
