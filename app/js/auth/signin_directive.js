const controller = ['$scope', 'auth', 'user', ($scope, auth, userService) => {
  $scope.auth = auth;
  $scope.loggedIn = !!auth.token;
  $scope.signup = false;
  $scope.signin = false;
  $scope.form = {};
  $scope.logout = auth.logout.bind(auth, () => $scope.loggedIn = false);
  $scope.toggleSignup = () => {
    $scope.signup = true;
    $scope.signin = false;
  };
  $scope.toggleSignin = () => {
    $scope.signin = true;
    $scope.signup = false;
  };
  $scope.submitForm = (user) => {
    const cb = () => {
      $scope.loggedIn = true;
      $scope.form = {};
    };
    if ($scope.signup) {
      userService.createUser(user, cb);
    } else {
      userService.login(user, cb);
    }
  };
}];

module.exports = (app) => {
  app.directive('loginWidget', () => {
    return {
      restrict: 'EA',
      templateUrl: 'templates/signin_directive_template.html',
      controller,
      replace: true
    };
  });
};