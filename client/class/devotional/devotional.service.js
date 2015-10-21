angular.module('class.devotional').service('ClassDevotionalService', [
  '$rootScope',
  '$meteor',
  '$q',
  function(
    $rootScope,
    $meteor,
    $q
  ){
    var exports = {};
    exports.getDevotionals = function(){
      var deferred = $q.defer();
      $meteor.call('getClassId').then(function(classId){
        $rootScope.$meteorSubscribe('allDevotionals', classId).then(function (handle) {
          var devotionals = $rootScope.$meteorCollection(Devotionals, {}, true);
          // if($rootScope.hasId){
            deferred.resolve(devotionals);
          // }

        });

      });

      return deferred.promise;
    };
    return exports;
  }
]);
