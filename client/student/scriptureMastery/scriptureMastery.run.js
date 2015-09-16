angular.module("student.scriptureMastery").run([
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
      if(toState.name === 'studentScriptureMasteryLoading'){
        $rootScope.scriptureMasteries = {};
      }
      if(toState.name === 'studentScriptureMastery' && fromState.name !== 'studentScriptureMasteryLoading'){
        return $state.go('studentScriptureMasteryLoading');
      }
      if(toState.name === 'studentScriptureMasteryLoading'){
        $rootScope.ScriptureMasteries = $meteor.collection(ScriptureMasteries, false);

        $rootScope.$meteorSubscribe("ownerScriptureMasteries").then(function (handle) {
          $rootScope.scriptureMasteries = $rootScope.$meteorObject(ScriptureMasteries, {}, true);
          if(!$rootScope.scriptureMasteries.scriptureMastery){
            $rootScope.scriptureMasteries.scriptureMastery = {};
            $rootScope.scriptureMasteries.scriptureMastery.q1={one:'null'};
            $rootScope.scriptureMasteries.scriptureMastery.q1.two='null';
            $rootScope.scriptureMasteries.scriptureMastery.q1.three='null';
            $rootScope.scriptureMasteries.scriptureMastery.q1.four='null';
            $rootScope.scriptureMasteries.scriptureMastery.q1.five='null';
            $rootScope.scriptureMasteries.scriptureMastery.q1.six='null';
            $rootScope.scriptureMasteries.scriptureMastery.q1.seven='null';

            $rootScope.scriptureMasteries.scriptureMastery.q2={one:'null'};
            $rootScope.scriptureMasteries.scriptureMastery.q2.two='null';
            $rootScope.scriptureMasteries.scriptureMastery.q2.three='null';
            $rootScope.scriptureMasteries.scriptureMastery.q2.four='null';
            $rootScope.scriptureMasteries.scriptureMastery.q2.five='null';
            $rootScope.scriptureMasteries.scriptureMastery.q2.six='null';
            $rootScope.scriptureMasteries.scriptureMastery.q2.seven='null';

            $rootScope.scriptureMasteries.scriptureMastery.q3={one:'null'};
            $rootScope.scriptureMasteries.scriptureMastery.q3.two='null';
            $rootScope.scriptureMasteries.scriptureMastery.q3.three='null';
            $rootScope.scriptureMasteries.scriptureMastery.q3.four='null';
            $rootScope.scriptureMasteries.scriptureMastery.q3.five='null';
            $rootScope.scriptureMasteries.scriptureMastery.q3.six='null';
            $rootScope.scriptureMasteries.scriptureMastery.q3.seven='null';

            $rootScope.scriptureMasteries.scriptureMastery.q4={one:'null'};
            $rootScope.scriptureMasteries.scriptureMastery.q4.two='null';
            $rootScope.scriptureMasteries.scriptureMastery.q4.three='null';
            $rootScope.scriptureMasteries.scriptureMastery.q4.four='null';
            $rootScope.scriptureMasteries.scriptureMastery.q4.five='null';
            $rootScope.scriptureMasteries.scriptureMastery.q4.six='null';
            $rootScope.scriptureMasteries.scriptureMastery.q4.seven='null';
          }
          var hasId = true;
          if(!$rootScope.scriptureMasteries._id){
            hasId = false;
            $rootScope.ScriptureMasteries.save({owner:$rootScope.currentUser._id, scriptureMastery:$rootScope.scriptureMasteries.scriptureMastery}).then(function(){
              $rootScope.scriptureMasteries = $rootScope.$meteorObject(ScriptureMasteries, {}, true);
              return $state.go('studentScriptureMastery');
            });
          }

          if(hasId)
            return $state.go('studentScriptureMastery');
        });
      }
    });
  }
]);
