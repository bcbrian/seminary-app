angular.module('class.announcements',[
  'seminary.core'
]);

angular.module('class.announcements').config([
  '$urlRouterProvider',
  '$stateProvider',
  '$locationProvider',
  function(
    $urlRouterProvider,
    $stateProvider,
    $locationProvider
  ){
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('classAnnouncements', {
        url: '/:userType/announcements',
        templateUrl: 'client/class/announcements/announcements.ng.html',
        controller: 'ClassAnnouncementsCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            console.log('1');
            return $meteor.requireUser();
          }],
          'announcements':['ClassAnnouncementsService',function(ClassAnnouncementsService){
            console.log('2');
            return ClassAnnouncementsService.getAnnouncements();
          }]
        }
      });
  }]);
