angular.module('student')
.controller('StudentCtrl', [
  '$rootScope',
  '$scope',
  '$state',
  '$meteor',
  function($rootScope, $scope, $state, $meteor){
    $scope.attendances = $rootScope.attendances;
    $scope.readings = $rootScope.readings;
    $scope.missedDays = 0;
    $scope.fullDays = 0;
    $scope.tardyDays = 0;
    $scope.daysRead = 0;
    $scope.mastered = 0;

    $rootScope.$watch('attendances',function(attendances){
      console.log('I changed!');
      if(attendances.attendance){
        for (var i = 0; i < attendances.attendance.length; i++) {
          if(attendances.attendance[i].status === 'absent'){
            $scope.missedDays ++;
          }
          if(attendances.attendance[i].status === 'partially'){
            $scope.tardyDays ++;
          }
          if(attendances.attendance[i].status === 'full'){
            $scope.fullDays ++;
          }
        }
        $scope.attendancePercent = Math.floor(($scope.tardyDays+$scope.fullDays) / ($scope.missedDays + $scope.tardyDays + $scope.fullDays) * 100);
        $scope.attendanceGraph = [
          {name:'absences', score:$scope.missedDays, color:'#bd362f'},
          {name:'tardies', score:$scope.tardyDays, color:'#fbb450'},
          {name:'full days', score:$scope.fullDays, color:'#62c462'}
        ];
      }
    });

    $rootScope.$watch('readings',function(readings){
      if(readings.reading){
        for (var i = 0; i < readings.reading.length; i++) {
          if(readings.reading[i].status === 'full'){
            $scope.daysRead ++;
          }
        }
      }
    });
  }
]);
