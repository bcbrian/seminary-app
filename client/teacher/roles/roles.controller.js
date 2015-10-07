angular.module('teacher.roles')
.controller('RolesCtrl', [
  '$scope',
  'students',
  function(
    $scope,
    students
  ){
    $scope.students = lodash.filter(students, function(student){
      return student.profile.type !== 'teacher';
    });
    $scope.presidentStudents = lodash.filter(students, function(student){
      return student.profile.type !== 'teacher' && student.profile.type !== 'student';
    });
    $scope.regularStudents = lodash.filter(students, function(student){
      return student.profile.type !== 'teacher' && student.profile.type !== 'president';
    });

    $scope.dragControlListeners = {
      itemMoved: function (event) {
        $scope.updatePresidents();
        $scope.updateRegulars();
      }
    };

    $scope.updatePresidents = function(){
      lodash.forEach($scope.presidentStudents, function(userStudent){
        if (userStudent.profile.type !== 'president') {
          lodash.forEach(students, function(dbStudent){
            if(userStudent._id === dbStudent._id){
              dbStudent.profile.type = 'president';
            }
          });
          userStudent.profile.type = 'president';
        }
      });
    };
    
    $scope.updateRegulars = function(){
      lodash.forEach($scope.regularStudents, function(userStudent){
        if (userStudent.profile.type !== 'student') {
          lodash.forEach(students, function(dbStudent){
            if(userStudent._id === dbStudent._id){
              dbStudent.profile.type = 'student';
            }
          });
          userStudent.profile.type = 'student';
        }
      });
    };

  }
]);
