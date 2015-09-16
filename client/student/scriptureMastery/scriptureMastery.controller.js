angular.module("student.scriptureMastery")
.controller("ScriptureMasteryCtrl", ["$scope", "$rootScope", "$state", "$meteor", function($scope, $rootScope, $state, $meteor){

  $scope.ScriptureMasteries = $meteor.collection(ScriptureMasteries, false);
  $scope.scriptureMasteries = $rootScope.scriptureMasteries;


  $scope.q1IsCollapsed = false;
  $scope.q2IsCollapsed = true;
  $scope.q3IsCollapsed = true;
  $scope.q4IsCollapsed = true;

  $scope.notSelected = function (val, section) {
    if(val === $scope.scriptureMasteries.scriptureMastery.q1.one && section !== 'q1:one'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q1.two && section !== 'q1:two'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q1.three && section !== 'q1:three'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q1.four && section !== 'q1:four'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q1.five && section !== 'q1:five'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q1.six && section !== 'q1:six'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q1.seven && section !== 'q1:seven'){return false;}

    if(val === $scope.scriptureMasteries.scriptureMastery.q2.one && section !== 'q2:one'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q2.two && section !== 'q2:two'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q2.three && section !== 'q2:three'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q2.four && section !== 'q2:four'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q2.five && section !== 'q2:five'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q2.six && section !== 'q2:six'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q2.seven && section !== 'q2:seven'){return false;}

    if(val === $scope.scriptureMasteries.scriptureMastery.q3.one && section !== 'q3:one'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q3.two && section !== 'q3:two'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q3.three && section !== 'q3:three'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q3.four && section !== 'q3:four'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q3.five && section !== 'q3:five'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q3.six && section !== 'q3:six'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q3.seven && section !== 'q3:seven'){return false;}

    if(val === $scope.scriptureMasteries.scriptureMastery.q4.one && section !== 'q4:one'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q4.two && section !== 'q4:two'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q4.three && section !== 'q4:three'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q4.four && section !== 'q4:four'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q4.five && section !== 'q4:five'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q4.six && section !== 'q4:six'){return false;}
    if(val === $scope.scriptureMasteries.scriptureMastery.q4.seven && section !== 'q4:seven'){return false;}

    return true;
  };
  $scope.needsSeven = function(val){
    if(val === 'q1' && ($scope.scriptureMasteries.scriptureMastery.q2.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q3.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q4.seven !== 'null')) return false;
    if(val === 'q2' && ($scope.scriptureMasteries.scriptureMastery.q1.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q3.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q4.seven !== 'null')) return false;
    if(val === 'q3' && ($scope.scriptureMasteries.scriptureMastery.q2.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q1.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q4.seven !== 'null')) return false;
    if(val === 'q4' && ($scope.scriptureMasteries.scriptureMastery.q2.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q3.seven !== 'null' || $scope.scriptureMasteries.scriptureMastery.q1.seven !== 'null')) return false;
    return true;
  };
}]);
