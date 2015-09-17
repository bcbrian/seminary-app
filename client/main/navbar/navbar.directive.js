angular.module("myApp")
.directive('myNavbar',['$meteor','$state', function($meteor, $state) {

  return{
    restrict:'E',
    templateUrl: 'client/main/navbar/navbar.ng.html',
    link:function(scope, element, attrs) {
      var user = $meteor.requireUser();
      user.then(function(){
        scope.user = user.$$state.value;
        scope.links=[];
        scope.links = generateLinks(scope.user.profile.type);
      });

      scope.$watch("currentUser", function(user){
        if(user && user.profile && user.profile.type){
          scope.user = user;
          scope.links=[];
          scope.links = generateLinks(scope.user.profile.type);
        }
      });

      scope.signOut = function(){
        $meteor.logout().then(function(){
          window.location.pathname = '/';
        });
      };

      var link = function(name, url){
        this.name = name;
        this.url = url;
        this.active = function(){
          return (window.location.pathname === this.url);
        };
        return this;
      };

      var generateLinks = function(userType){
        var links = [];
        var routes = [];
        var url = "";

        if(userType){
          if(userType === 'student'){
            scope.name = scope.user.profile.firstName;
            routes = [
              {
                name:"Attendance",
                url:"attendance",
              },{
                name:"Reading",
                url:"reading"
              },{
                name:"Scripture Mastery",
                url:"scripture-mastery",
              }
            ];
          }
          for (var i = 0; i < routes.length; i++) {
            url = "/"+userType +"/"+ routes[i].url;
            links.push(new link(routes[i].name, url));
          }

        }
        return links;
      };
    }
  };
}]);
