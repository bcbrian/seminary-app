angular.module('myApp',[
  //core
  'seminary.core',
  //features
  //class
  'class.attendance',
  'class.devotional',
  //student
  'student',
  'student.attendance',
  'student.profile',
  'student.reading',
  'student.scriptureMastery',
  //teacher
  'teacher.roles'
]);

function onReady() {
  angular.bootstrap(document, ['myApp']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

angular.module('seminary.core',[
  'angular-meteor',
  'ui.bootstrap',
  'ui.router',
  'angularUtils.directives.dirPagination',
  'as.sortable',
  'ngAnimate',
  'd3'
]);
