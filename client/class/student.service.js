angular.module('class.attendance').service('StudentService', [
  '$rootScope',
  '$q',
  function(
    $rootScope,
    $q
  ){
    var exports = {};
    exports.getAllStudents = function(){
      var deferred = $q.defer();


      $rootScope.$meteorSubscribe('myStudents', $rootScope.currentUser.profile.class.name).then(function (handle) {
        var students = $rootScope.$meteorCollection(Meteor.users, true);
        deferred.resolve(students);

      });
      return deferred.promise;
    };
    exports.getAllRegularStudents = function(){
      var deferred = $q.defer();


      $rootScope.$meteorSubscribe('myRegularStudents', $rootScope.currentUser.profile.class.name).then(function (handle) {
        var students = $rootScope.$meteorCollection(Meteor.users, true);
        deferred.resolve(students);

      });
      return deferred.promise;
    };
    exports.getAllPresidentsStudents = function(){
      var deferred = $q.defer();


      $rootScope.$meteorSubscribe('myPresidnetStudents', $rootScope.currentUser.profile.class.name).then(function (handle) {
        var students = $rootScope.$meteorCollection(Meteor.users, true);
        deferred.resolve(students);

      });
      return deferred.promise;
    };
    return exports;
  }
]);
