angular.module('student.reading').run([
  '$rootScope',
  '$state',
  '$meteor',
  function(
    $rootScope,
    $state,
    $meteor
  ){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if(toState.name === 'studentReadingLoading'){
        $rootScope.readings = {};
      }
      if(toState.name === 'studentReading' && fromState.name !== 'studentReadingLoading'){
        return $state.go('studentReadingLoading');
      }
      if(toState.name === 'studentReadingLoading'){
        $rootScope.Readings = $meteor.collection(Readings, false);

        $rootScope.$meteorSubscribe('ownerReadings').then(function (handle) {
          $rootScope.readings = $rootScope.$meteorObject(Readings, {}, true);
          if(!$rootScope.readings.reading){
            $rootScope.readings.reading = [];
          }
          $rootScope.hasId = false;
          if($rootScope.readings._id){
            $rootScope.hasId = true;
          }
          if(!$rootScope.hasId){

            $rootScope.Readings.save({owner:$rootScope.currentUser._id, reading:$rootScope.readings.reading}).then(function(){
              $rootScope.readings = $rootScope.$meteorObject(Readings, {}, true);
              console.log('NEW EVENTS', $rootScope.reading);
              return $state.go('studentReading');
            });
          }

          if($rootScope.hasId)
            return $state.go('studentReading');
        });
      }
    });
  }
]);
