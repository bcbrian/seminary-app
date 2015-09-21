angular.module("student.scriptureMastery").service('ScriptureMasteryService', [
  "$rootScope",
  "$q",
  function(
    $rootScope,
    $q
  ){
    var exports = {};
    exports.getScriptureMasteries = function(){
      console.log('Got called');
      var deferred = $q.defer();

      mScriptureMasteries = $rootScope.$meteorCollection(ScriptureMasteries, false);

      $rootScope.$meteorSubscribe("ownerScriptureMasteries").then(function (handle) {
        console.log('1');
        scriptureMasteries = $rootScope.$meteorObject(ScriptureMasteries, {}, true);
        if(!scriptureMasteries.scriptureMastery){
          console.log('2');
          scriptureMasteries.scriptureMastery = {
            q1:{},
            q2:{},
            q3:{},
            q4:{}
          };
          for (var q in scriptureMasteries.scriptureMastery) {
            console.log('3');
            if (scriptureMasteries.scriptureMastery.hasOwnProperty(q)) {
              q.one='null';
              q.two='null';
              q.three='null';
              q.four='null';
              q.five='null';
              q.six='null';
              q.seven='null';
            }
          }
          // scriptureMasteries.scriptureMastery.q1.one='null';
          // scriptureMasteries.scriptureMastery.q1.two='null';
          // scriptureMasteries.scriptureMastery.q1.three='null';
          // scriptureMasteries.scriptureMastery.q1.four='null';
          // scriptureMasteries.scriptureMastery.q1.five='null';
          // scriptureMasteries.scriptureMastery.q1.six='null';
          // scriptureMasteries.scriptureMastery.q1.seven='null';
          //
          // scriptureMasteries.scriptureMastery.q2.one='null';
          // scriptureMasteries.scriptureMastery.q2.two='null';
          // scriptureMasteries.scriptureMastery.q2.three='null';
          // scriptureMasteries.scriptureMastery.q2.four='null';
          // scriptureMasteries.scriptureMastery.q2.five='null';
          // scriptureMasteries.scriptureMastery.q2.six='null';
          // scriptureMasteries.scriptureMastery.q2.seven='null';
          //
          // scriptureMasteries.scriptureMastery.q3.one='null';
          // scriptureMasteries.scriptureMastery.q3.two='null';
          // scriptureMasteries.scriptureMastery.q3.three='null';
          // scriptureMasteries.scriptureMastery.q3.four='null';
          // scriptureMasteries.scriptureMastery.q3.five='null';
          // scriptureMasteries.scriptureMastery.q3.six='null';
          // scriptureMasteries.scriptureMastery.q3.seven='null';
          //
          // scriptureMasteries.scriptureMastery.q4.one='null';
          // scriptureMasteries.scriptureMastery.q4.two='null';
          // scriptureMasteries.scriptureMastery.q4.three='null';
          // scriptureMasteries.scriptureMastery.q4.four='null';
          // scriptureMasteries.scriptureMastery.q4.five='null';
          // scriptureMasteries.scriptureMastery.q4.six='null';
          // scriptureMasteries.scriptureMastery.q4.seven='null';
        }
        var hasId = true;
        if(!scriptureMasteries._id){
          console.log('4');
          hasId = false;
          mScriptureMasteries.save({owner:$rootScope.currentUser._id, scriptureMastery:scriptureMasteries.scriptureMastery}).then(function(){
            scriptureMasteries = $rootScope.$meteorObject(ScriptureMasteries, {}, true);
            deferred.resolve(scriptureMasteries);
          });
        }

        if(hasId){
          console.log('5');
          deferred.resolve(scriptureMasteries);
        }

      });
      return deferred.promise;
    };
    return exports;
  }
]);
