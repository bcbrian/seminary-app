angular.module('teacher.attendance').service('StudentService', [
  '$rootScope',
  '$q',
  function(
    $rootScope,
    $q
  ){
    var exports = {};
    exports.getAllStudents = function(){
      var deferred = $q.defer();
      var mAttendances = $rootScope.$meteorCollection(Attendances, false);


      $rootScope.$meteorSubscribe('myStudents', $rootScope.currentUser.profile.class.name).then(function (handle) {
        var students = $rootScope.$meteorCollection(Meteor.users, true);
        deferred.resolve(students);

      });
      return deferred.promise;
    };
    return exports;
  }
]);
