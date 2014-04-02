var app = angular.module("Todo", ["ngResource"]);



// blah refactor for a parent scope
// in there add a flash message set method

// Do we really need a service here?
// This is a service, so it is a singleton....
app.service("AccessToken", function() {
  // return {
  //   getToken: function() {
  //     return sessionStorage.getItem("token");
  //   },
  //   setToken: function(token) {
  //     sessionStorage.setItem("token", token);
  //   },
  //   haveToken: function() {
  //     if(this.getToken() != null ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }

  this.token = "";
  this.getToken = function() {
    // console.log("getting token..."+this.token);
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

// Create a Todo resource to match our Todo api endpoints
app.factory("Todo", function($resource, AccessToken) {
  // console.log("aaaaa"+AccessToken.getToken())
  return $resource("/api/todos/:id", 
    { id: "@id",
      access_token: function() {
        return AccessToken.getToken();
      }
    },
    { update: { method: "PUT" } }
  );
});

this.AccessTokenController = function($scope, $http, AccessToken) {

  // Let's prefill the form for ease of use in this case.
  $scope.newAccessToken = {
    username: "username",
    password: "password"
  }

  $scope.add = function() {
    if($scope.newAccessToken == undefined 
      || $scope.newAccessToken.username == "" 
      || $scope.newAccessToken.password == "") {
      $scope.$parent.message = "Please Enter Your Credentials.";
      $scope.$parent.messageClass = $scope.$parent.ERROR_MESSAGE_CLASS;
      return;
    }

    $http.post('/api/access_tokens', { username: $scope.newAccessToken.username, password: $scope.newAccessToken.password })
      .success(function(response) {
        AccessToken.setToken(response.token);
        $scope.$parent.message = "Success!  You Are Logged In!";
        $scope.$parent.messageClass = $scope.$parent.SUCCESS_MESSAGE_CLASS;
      })
      .error(function() {
        $scope.$parent.message = "Invalid Username Or Password.";
        $scope.$parent.messageClass = $scope.$parent.ERROR_MESSAGE_CLASS;
      })
  }

  $scope.haveToken = function() {
    return AccessToken.haveToken();
  }

  $scope.destroyToken = function() {
    return AccessToken.destroyToken();
  }

  $scope.getToken = function() {
    return AccessToken.getToken();
  }

}

this.TodoController = function($scope, Todo, AccessToken) {
  $scope.ERROR_MESSAGE_CLASS = "error-message";
  $scope.EMPTY_MESSAGE_CLASS = "empty-message";
  $scope.SUCCESS_MESSAGE_CLASS = "success-message";

  $scope.todos = Todo.query(
    function() {  },
    function() { 
      $scope.message = "Something went wrong, we could not fetch your todos."; 
      $scope.messageClass = $scope.ERROR_MESSAGE_CLASS;
    }
  );

  $scope.add = function() {
    if(!$scope.isValid()) {
      return false;
    }

    var todo = Todo.save($scope.newTodo,
      function() { 
        $scope.message = todo.label + " Successfully Created!";
        $scope.messageClass = $scope.SUCCESS_MESSAGE_CLASS;
      },
      function() {
        // our save failed
        // take off what we've already appended
        $scope.todos.pop(todo);
        $scope.newTodo = { label: todo.label }
        $scope.message = "Something went wrong, we could not create your todo.";
        $scope.messageClass = $scope.ERROR_MESSAGE_CLASS;
      }
    );

    // optimistically append to the end of our list
    $scope.todos.push(todo);
    $scope.newTodo = {};
    $scope.message = "";
    $scope.messageClass = $scope.EMPTY_MESSAGE_CLASS;
  }

  $scope.toggleDone = function(todo) {
    todo.done = !todo.done;

    todo.$update(
      function() { 
        var doneText = todo.done ? 'Complete' : 'Incomplete';
        $scope.message = todo.label + " Successfully Marked As " + doneText + "!";
        $scope.messageClass = $scope.SUCCESS_MESSAGE_CLASS;
      },
      function() {
        $scope.message = "Something went wrong, we could not update your todo.";
        $scope.messageClass = $scope.ERROR_MESSAGE_CLASS;
        todo.done = !todo.done;
      }
    );
  }

  $scope.delete = function(todo) {
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);

    todo.$delete(
      function() { 
        $scope.message = todo.label + " Successfully Deleted!";
        $scope.messageClass = $scope.SUCCESS_MESSAGE_CLASS;
      },
      function() { 
        $scope.message = "Something went wrong, we could not delete your todo."; 
        $scope.messageClass = $scope.ERROR_MESSAGE_CLASS;
        $scope.todos.push(todo);
      }
    );
  }

  $scope.isValid = function () {

    if($scope.newTodo == undefined || $scope.newTodo.label == "") {
      $scope.message = "Todo cannot be blank!";
      $scope.messageClass = $scope.ERROR_MESSAGE_CLASS;
      return false;
    }

    // check the uniqueness of the todo
    for(var i = 0; i < $scope.todos.length; i++) {
      if( $scope.todos[i].label.toLowerCase() == $scope.newTodo.label.toLowerCase() ) {
        $scope.message = "You already have to do " + $scope.newTodo.label + "!";
        $scope.messageClass = $scope.ERROR_MESSAGE_CLASS;
        return false;
      }
    }

    // the object is valid if we make it here
    return true;
  }

  $scope.haveToken = function() {
    return AccessToken.haveToken();
  }

};

