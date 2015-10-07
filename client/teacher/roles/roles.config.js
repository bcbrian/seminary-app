angular.module('teacher.roles',[
  'seminary.core'
]);

angular.module('teacher.roles').config([
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
      .state('teacherRoles', {
        url: '/teacher/roles',
        templateUrl: 'client/teacher/roles/roles.ng.html',
        controller: 'RolesCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
          }],
          'students':['StudentService', function(StudentService){
            return StudentService.getAllStudents();
          }]
        }
      });
  }]);
