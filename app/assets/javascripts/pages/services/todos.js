

// Create a Todo resource to match our Todo api endpoints
// Notice the access_token parameter is defaulted to the 
// value of the getToken() method call.
app.factory("Todo", function($resource, AccessToken) {
  return $resource("/api/todos/:id", 
    { id: "@id",
      access_token: function() {
        return AccessToken.getToken();
      }
    },
    { update: { method: "PUT" } }
  );
});