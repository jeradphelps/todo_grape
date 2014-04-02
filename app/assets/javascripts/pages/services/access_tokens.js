
// This is a service, so it is a singleton.  This singleton's 
// token property will hold our access token that authenticates us
// with the todo api.  Angular resources and other calls to the api
// should wrap getToken method to provide access to this property.
// 
// This is split out into this service so other controllers 
// (like the todo controller) may have access to the token
app.service("AccessToken", function() {
  this.token = "";
  this.getToken = function() {
    return this.token;
  }
  this.setToken = function(token) {
    this.token = token;
  }
  this.haveToken = function() {
    if(this.token != "") {
      return true;
    } else {
      return false;
    }
  }
  this.destroyToken = function() {
    this.token = "";
  }
});