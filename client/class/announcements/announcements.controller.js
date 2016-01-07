angular.module('class.announcements')
.controller('ClassAnnouncementsCtrl', [
  '$scope',
  '$rootScope',
  '$meteor',
  'announcements',
  function(
    $scope,
    $rootScope,
    $meteor,
    announcements
  ){
    $scope.Announcements = $scope.$meteorCollection(Announcements, false);
    $scope.announcements = announcements;

    $scope.review = false;

    $meteor.call('getClassId').then(function(response){
      $scope.classId = response;
    });



    $scope.thisAnnouncements = {};
    $scope.submitAnnouncements = function(date){

      $scope.thisAnnouncements.owner = $scope.classId;
      $scope.Announcements.save($scope.thisAnnouncements);

      // $scope.announcements.save();

      $scope.thisAnnouncements = {};

    };

    $scope.remove = function(id){
      $scope.Announcements.remove(id);
    };
  }
]);
