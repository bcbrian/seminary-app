angular.module("student").run([
  "$rootScope",
  "$state",
  "$meteor",
  function(
    $rootScope,
    $state,
    $meteor
  ){
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
      ///////////////////////////////////////////////////////////////////////////////////////////////////
      if(toState.name === 'studentLoading'){
        $rootScope.attendances = {};
        $rootScope.readings = {};
        $rootScope.scriptureMasteries = {};
      }
      if(toState.name === 'student' && fromState.name !== 'studentLoading'){
        return $state.go('studentLoading');
      }
      if(toState.name === 'studentLoading'){
        $rootScope.Attendances = $meteor.collection(Attendances, true);
        $rootScope.Readings = $meteor.collection(Readings, true);
        $rootScope.ScriptureMasteries = $meteor.collection(ScriptureMasteries, true);

        $rootScope.$meteorSubscribe("ownerAttendances").then(function () {
          $rootScope.$meteorSubscribe('ownerReadings').then(function (handle) {
            $rootScope.$meteorSubscribe("ownerScriptureMasteries").then(function (handle) {

              $rootScope.attendances = $rootScope.$meteorObject(Attendances, {}, true);
              $rootScope.readings = $rootScope.$meteorObject(Readings, {}, true);
              $rootScope.scriptureMasteries = $rootScope.$meteorObject(ScriptureMasteries, {}, true);
              return $state.go('student');
            });
          });
        });
      }
    });
  }
]);
