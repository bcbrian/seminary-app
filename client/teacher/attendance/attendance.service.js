angular.module('teacher.attendance').service('AttendanceService', [
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

      $rootScope.$meteorSubscribe('studentAttendances').then(function (handle) {
        var attendances = $rootScope.$meteorCollection(Attendances, {}, true);

        // _.forEach(attendances, function(attendance){
        //   if(!attendance.attendance){
        //     attendance.attendance = [];
        //   }
        //
        //   $rootScope.hasId = false;
        //   if(attendance._id){
        //     $rootScope.hasId = true;
        //   }
        //
        //   if(!$rootScope.hasId){
        //     mAttendances.save({owner:$rootScope.currentUser._id, attendance:attendance.attendance}).then(function(){
        //       attendances = $rootScope.$meteorObject(Attendances, {}, true);
        //       deferred.resolve(attendances);
        //     });
        //   }
        // });



        // if($rootScope.hasId){
          deferred.resolve(attendances);
        // }

      });
      return deferred.promise;
    };
    return exports;
  }
]);
