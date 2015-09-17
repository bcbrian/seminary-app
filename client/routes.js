angular.module("myApp").run(["$rootScope", "$state", "$meteor", function($rootScope, $state, $meteor) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {


    if (error === "AUTH_REQUIRED" || error.reason === "AUTH_REQUIRED") {
      return $state.go('home');
    }
    // if ((error.reason === "PROFILE_UNDEFINED" || error.reason === "NO_PROFILE") && toState.name != "profile") {
    //   return $state.go('profile');
    // }
  });

}]);

angular.module("myApp").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/main/home/home.ng.html',
        controller: 'HomeCtrl'
      })
      .state('signIn', {
        url:'/sign-in',
        templateUrl: 'client/user/sign-in/sign-in.ng.html',
        controller: 'SignInCtrl'
      })
      .state('signUp', {
        url:'/sign-up',
        templateUrl: 'client/user/sign-up/sign-up.ng.html',
        controller: 'SignUpCtrl'
      })
      .state('register', {
        url:'/register',
        templateUrl: 'client/user/register/register.ng.html',
        controller: 'RegisterCtrl'
      })

      //States for user
      .state('teacher', {
        url:'/teacher',
        templateUrl: 'client/teacher/teacher.ng.html',
        controller: 'UserCtrl'
      })
      .state('teacherProfile', {
        url: '/teacher/profile',
        templateUrl: 'client/teacher/profile/profile.ng.html',
        controller: 'TeacherProfileCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('studentProfile', {
        url: '/student/profile',
        templateUrl: 'client/student/profile/profile.ng.html',
        controller: 'StudentProfileCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      });

    $urlRouterProvider.otherwise("/");//Not found page???
  }]);
