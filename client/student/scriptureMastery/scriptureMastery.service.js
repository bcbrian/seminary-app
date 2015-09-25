angular.module("student.scriptureMastery").service('ScriptureMasteryService', [
  "$rootScope",
  "$q",
  function(
    $rootScope,
    $q
  ){
    var exports = {};
    exports.getScriptureMasteries = function(){
      var deferred = $q.defer();

      mScriptureMasteries = $rootScope.$meteorCollection(ScriptureMasteries, false);

      $rootScope.$meteorSubscribe("ownerScriptureMasteries").then(function (handle) {
        scriptureMasteries = $rootScope.$meteorObject(ScriptureMasteries, {}, true);
        if(!scriptureMasteries.scriptureMastery){
          scriptureMasteries.scriptureMastery = { q1:{}, q2:{}, q3:{}, q4:{} };
          
          _.each(scriptureMasteries.scriptureMastery, function(quarter){
            quarter.one='null';
            quarter.two='null';
            quarter.three='null';
            quarter.four='null';
            quarter.five='null';
            quarter.six='null';
            quarter.seven='null';
          });
        }

        var hasId = true;
        if(!scriptureMasteries._id){
          hasId = false;
          mScriptureMasteries.save({owner:$rootScope.currentUser._id, scriptureMastery:scriptureMasteries.scriptureMastery}).then(function(){
            scriptureMasteries = $rootScope.$meteorObject(ScriptureMasteries, {}, true);
            deferred.resolve(scriptureMasteries);
          });
        }

        if(hasId){
          deferred.resolve(scriptureMasteries);
        }

      });
      return deferred.promise;
    };
    return exports;
  }
]);
