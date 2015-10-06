angular.module('student.reading')
.controller('ReadingCtrl', [
  '$scope',
  'readings', function(
    $scope,
    readings
  ){
    $scope.Readings = $scope.$meteorCollection(Readings, false);
    $scope.events = readings;

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
      opened: false
    };

    var tomorrow = new Date('9-12-2015');

    var afterTomorrow = new Date('9-13-2015');
    var afterTomorrow2 = new Date('9-14-2015');

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day' && $scope.events.reading) {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i=0;i<$scope.events.reading.length;i++){
          var currentDay = new Date($scope.events.reading[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events.reading[i].status;
          }
        }
      }

      return '';
    };

    $scope.markAttendance = function(reading){

      var exists = lodash.find($scope.events.reading, {date:moment($scope.dt).format('L')});
      if(exists){
        exists.status = reading;
      }else{

        $scope.events.reading.push({
          date:moment($scope.dt).format('L'),
          status:reading
        });
      }

    };
  }
]);
