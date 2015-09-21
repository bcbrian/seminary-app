angular.module('student.attendance').service('AttendanceService', [
  '$rootScope',
  '$q',
  function(
    $rootScope,
    $q
  ){
    var exports = {};
    exports.getAttendances = function(){
      var deferred = $q.defer();
      var mAttendances = $rootScope.$meteorCollection(Attendances, false);

      $rootScope.$meteorSubscribe('ownerAttendances').then(function (handle) {
        var attendances = $rootScope.$meteorObject(Attendances, {}, true);

        if(!attendances.attendance){
          attendances.attendance = [];
        }

        $rootScope.hasId = false;
        if(attendances._id){
          $rootScope.hasId = true;
        }

        if(!$rootScope.hasId){
          mAttendances.save({owner:$rootScope.currentUser._id, attendance:attendances.attendance}).then(function(){
            attendances = $rootScope.$meteorObject(Attendances, {}, true);
            deferred.resolve(attendances);
          });
        }

        if($rootScope.hasId){
          deferred.resolve(attendances);
        }

      });
      return deferred.promise;
    };
    return exports;
  }
]);
