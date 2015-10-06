angular.module('teacher.attendance',[
  'seminary.core'
]);

angular.module('teacher.attendance').config([
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
      .state('teacherAttendance', {
        url: '/teacher/attendance',
        templateUrl: 'client/teacher/attendance/attendance.ng.html',
        controller: 'TeacherAttendanceCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
          }],
          'attendances':['AttendanceService',function(AttendanceService){
            return AttendanceService.getAttendances();
          }],
          'students':['StudentService', function(StudentService){
            return StudentService.getAllStudents();
          }]
        }
      });
  }]);
