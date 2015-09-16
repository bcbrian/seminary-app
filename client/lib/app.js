angular.module('myApp',[
  //core
  'seminary.core',
  //features
  'student',
  'student.attendance',
  'student.reading',
  'student.scriptureMastery'
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
  'ui.sortable',
  'ngAnimate',
  'd3'
]);
