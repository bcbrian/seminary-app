angular.module('student.reading').service('ReadingService', [
  '$rootScope',
  '$q',
  function(
    $rootScope,
    $q
  ){
    var exports = {};
    exports.getReadings = function(){
      var deferred = $q.defer();
      var mReadings = $rootScope.$meteorCollection(Readings, false);

      $rootScope.$meteorSubscribe('ownerReadings').then(function (handle) {
        var readings = $rootScope.$meteorObject(Readings, {}, true);
        if(!readings.reading){
          readings.reading = [];
        }

        var hasId = false;
        if(readings._id){
          hasId = true;
        }

        if(!hasId){
          mReadings.save({owner:$rootScope.currentUser._id, reading:readings.reading}).then(function(){
            readings = $rootScope.$meteorObject(Readings, {}, true);
            console.log('NEW EVENTS', $rootScope.reading);
            deferred.resolve(readings);
          });
        }

        if(hasId){
          deferred.resolve(readings);
        }

      });
      return deferred.promise;
    };
    return exports;
  }
]);
