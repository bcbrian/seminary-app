angular.module('class.announcements').service('ClassAnnouncementsService', [
  '$rootScope',
  '$meteor',
  '$q',
  function(
    $rootScope,
    $meteor,
    $q
  ){
    var exports = {};
    exports.getAnnouncements = function(){
        console.log('I was called!!!!!');
      var deferred = $q.defer();
      $meteor.call('getClassId').then(function(classId){

        $rootScope.$meteorSubscribe('allAnnouncements', classId).then(function (handle) {

          var announcements = $rootScope.$meteorCollection(Announcements, {}, true);
          // if($rootScope.hasId){
            deferred.resolve(announcements);
          // }

        });

      });

      return deferred.promise;
    };
    return exports;
  }
]);
