


// The Todo api requires an access token for all non get requests.
// This controller implements an add method, which makes a request
// to the todo api to create a new access key.  Upon receipt of that 
// key, this controller sets the token in the Access Token service
// so it can be used throughout the remainder of the apps life.
this.AccessTokenController = function($scope, $http, AccessToken) {

  // We don't want to type the username and password every time we load the page
  // so pre-fill it.
  $scope.newAccessToken = {
    username: "username",
    password: "password"
  }

  $scope.add = function() {
    if($scope.newAccessToken == undefined 
      || $scope.newAccessToken.username == "" 
      || $scope.newAccessToken.password == "") {
      $scope.setFlashMessage("Please Enter Your Credentials!",$scope.ERROR_MESSAGE_CLASS);
      return;
    }

    $http.post('/api/access_tokens', { username: $scope.newAccessToken.username, password: $scope.newAccessToken.password })
      .success(function(response) {
        AccessToken.setToken(response.token);
        $scope.setFlashMessage("Success! You Are Logged In!",$scope.SUCCESS_MESSAGE_CLASS);
      })
      .error(function() {
        $scope.setFlashMessage("Invalid Username Or Password!",$scope.ERROR_MESSAGE_CLASS);
      })
  }

  // Wrap the methods from the Access Token Service so we can 
  // bind to them from handlebars.
  $scope.haveToken = function() {
    return AccessToken.haveToken();
  }

  $scope.destroyToken = function() {
    $scope.setFlashMessage("You've been logged out!",$scope.ERROR_MESSAGE_CLASS);
    return AccessToken.destroyToken();
  }

  $scope.getToken = function() {
    return AccessToken.getToken();
  }

}