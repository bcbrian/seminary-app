angular.module("student.attendance").run([
  "$rootScope",
  "$state",
  "$meteor",
  function(
    $rootScope,
    $state,
    $meteor
  ){
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
      if(toState.name === 'studentAttendanceLoading'){
        console.log('GETTING HERE AND DONT WANT TO!');
        $rootScope.attendances = {};
      }
      if(toState.name === 'studentAttendance' && fromState.name !== 'studentAttendanceLoading'){
        return $state.go('studentAttendanceLoading');
      }
      if(toState.name === 'studentAttendanceLoading'){
        $rootScope.Attendances = $meteor.collection(Attendances, false);

        $rootScope.$meteorSubscribe("ownerAttendances").then(function (handle) {
          $rootScope.attendances = $rootScope.$meteorObject(Attendances, {}, true);
          if(!$rootScope.attendances.attendance){
            $rootScope.attendances.attendance = [];
          }
          $rootScope.hasId = false;
          if($rootScope.attendances._id){
            $rootScope.hasId = true;
          }
          if(!$rootScope.hasId){

            $rootScope.Attendances.save({owner:$rootScope.currentUser._id, attendance:$rootScope.attendances.attendance}).then(function(){
              $rootScope.attendances = $rootScope.$meteorObject(Attendances, {}, true);
              console.log('NEW EVENTS', $rootScope.attendances);
              return $state.go('studentAttendance');
            });
          }

          if($rootScope.hasId)
            return $state.go('studentAttendance');
        });
      }
    });
  }
]);
