angular.module('class.attendance')
.controller('ClassAttendanceCtrl', [
  '$scope',
  'attendances',
  'students',
  function(
    $scope,
    attendances,
    students
  ){
    $scope.Attendances = $scope.$meteorCollection(Attendances, false);
    $scope.attendances = attendances;
    $scope.students = students;



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

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day' && $scope.attendances.attendance) {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i=0;i<$scope.attendances.attendance.length;i++){
          var currentDay = new Date($scope.attendances.attendance[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.attendances.attendance[i].status;
          }
        }
      }

      return '';
    };

    $scope.markAttendance = function(student, attendanceStatus){
      var attendance = $scope.$meteorObject(Attendances, {'_id':lodash.result( lodash.find( $scope.attendances, {owner:student} ), '_id' )}, true);
      var exists = lodash.find(attendance.attendance, {date:moment($scope.dt).format('L')});

      if(exists){
        exists.status = attendanceStatus;
      }else{

        attendance.attendance.push({
          date:moment($scope.dt).format('L'),
          status:attendanceStatus
        });
      }
      attendance.save();
    };

    $scope.getStatus = function(studentId){
      var attendance = lodash.find($scope.attendances, {'owner':studentId});
      var exists = lodash.find(attendance.attendance, {date:moment($scope.dt).format('L')});
      if(exists){
        switch(exists.status){
          case 'full':
            return 'success';
          case 'partially':
            return 'warning';
          case 'absent':
            return 'danger';
          default:
            return 'default';
        }
      }else{
        return 'default';
      }
    };

  }
]);
