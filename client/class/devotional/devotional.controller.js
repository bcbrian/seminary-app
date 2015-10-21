angular.module('class.devotional')
.controller('ClassDevotionalCtrl', [
  '$scope',
  '$rootScope',
  '$meteor',
  'devotionals',
  'students',
  function(
    $scope,
    $rootScope,
    $meteor,
    devotionals,
    students
  ){
    $scope.Devotionals = $scope.$meteorCollection(Devotionals, false);
    $scope.devotionals = devotionals;
    $scope.students = students;
    $scope.presidents = lodash.filter(students, function(student){
      return student.profile.type === 'president';
    });
    $scope.review = false;

    $meteor.call('getClassId').then(function(response){
      $scope.classId = response;
    });


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
      // if (mode === 'day' && $scope.attendances.attendance) {
      //   var dayToCheck = new Date(date).setHours(0,0,0,0);
      //
      //   for (var i=0;i<$scope.attendances.attendance.length;i++){
      //     var currentDay = new Date($scope.attendances.attendance[i].date).setHours(0,0,0,0);
      //
      //     if (dayToCheck === currentDay) {
      //       return $scope.attendances.attendance[i].status;
      //     }
      //   }
      // }

      return '';
    };
    $scope.thisDevotionals = {};
    $scope.submitDevotional = function(date){
      $scope.thisDevotionals.date = date ? moment(date, 'L').format('L') : moment($scope.dt).format('L');

      // var devotional = $scope.$meteorObject(Devotionals, {'_id':lodash.result( lodash.find( $scope.devotionals, {owner:classId} ), '_id' )}, true);
      var exists = lodash.find(devotionals, {date:$scope.thisDevotionals.date});

      if(exists){
        exists.status = attendanceStatus;
      }else{
        $scope.thisDevotionals.owner = $scope.classId;
        $scope.Devotionals.save($scope.thisDevotionals);
      }

      $scope.devotionals.save();

    };

    $scope.$watch('dt', function(newDate){
      $scope.thisDevotionals = lodash.find($scope.devotionals, function(devotional){
        return devotional.date === moment(newDate).format('L');
      });

      if($scope.thisDevotionals){
        $scope.thisDevotionals = $scope.$meteorObject(Devotionals, {_id:$scope.thisDevotionals._id}, true);
      }else{
        $scope.thisDevotionals = {};
      }
    });

    $scope.showAllDevotionals = true;
    $scope.switchView = function(){
      console.log('Switching View');
      $scope.showAllDevotionals = !$scope.showAllDevotionals;
      if($scope.showAllDevotionals){
        console.log('Show All');
        $scope.devotionals = devotionals;
      }else{
        console.log('Show Mine');
        $scope.devotionals = lodash.filter(devotionals, function(devotional){
          return  devotional.conductor === $rootScope.currentUser._id ||
                  devotional.prayer === $rootScope.currentUser._id ||
                  devotional.devotional === $rootScope.currentUser._id;
        });
      }
    };


  }
]);
