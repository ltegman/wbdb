module.exports = function(app) {
  app.controller('UserController', ['$scope', '$http', 'Resource', '$stateParams', 'auth',
    function($scope, $http, Resource, $stateParams, auth) {

      $scope.tags = [{tag: "Arrays"}, {tag: "Strings"}, {tag: "Trees"}, {tag: "Queues"},
        {tag: "Hash Tables"}, {tag: "Recursion"}, {tag: "Stacks"}, {tag: "Binary Trees"}, {tag: "Linked Lists"}];
      $scope.myChallenges = [];
      $scope.favorites = [];
      $scope.newChallenge = {};
      $scope.challengeService = new Resource('/challenges');
      $scope.favoriteService = new Resource('/favorites');
      $scope.solutionService = new Resource('/solutions');
      $scope.submitChallenge = function() {
        // Set the current date and time
        var currentDate = new Date();
        var options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        $scope.newChallenge.createdOn = currentDate.toLocaleTimeString('en-us', options);
        var copiedChallenge = angular.copy($scope.newChallenge);

        // Send newPost to the DB
        copiedChallenge.tags = copiedChallenge.tags.map((tag) => tag.tag);
        copiedChallenge.userId = auth.getUserId();
        copiedChallenge.solutions = [copiedChallenge.solution];
        $scope.challengeService.create(copiedChallenge, (err, res) => {
          if (err) return console.log(err);
          $scope.newChallenge = null;
          $scope.myChallenges.push(res);
        });

      };
      $scope.getAllFavorites = function() {
        $scope.favoriteService.getAll((err, res) => {
          if (err) return console.log(err);
          $scope.favorites = res;
        });
      };
      $scope.getUserChallenges = function() {
        $http.get(__BASEURL__ + '/api/mychallenges')
          .then((res) => {
            $scope.myChallenges = res.data;
          }, (err) => {
            console.log(err);
          });
      };
  }]);
};
