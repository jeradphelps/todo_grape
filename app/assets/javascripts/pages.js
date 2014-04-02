var app = angular.module("Todo", ["ngResource"]);

// Create a Todo resource to match our Todo api endpoints
app.factory("Todo", function($resource) {
  return $resource("/api/todos/:id", 
    { id: "@id" },
    { update: { method: "PUT" } }
  );
});

this.TodoController = function($scope, Todo) {
  var ERROR_MESSAGE_CLASS = "error-message";
  var EMPTY_MESSAGE_CLASS = "empty-message";
  var SUCCESS_MESSAGE_CLASS = "success-message";

  $scope.todos = Todo.query(
    function() {  },
    function() { 
      $scope.message = "Something went wrong, we could not fetch your todos."; 
      $scope.messageClass = ERROR_MESSAGE_CLASS;
    }
  );

  $scope.add = function() {
    if(!$scope.isValid()) {
      return false;
    }

    var todo = Todo.save($scope.newTodo,
      function() { 
        $scope.message = todo.label + " Successfully Created!";
        $scope.messageClass = SUCCESS_MESSAGE_CLASS;
      },
      function() {
        // our save failed
        // take off what we've already appended
        $scope.todos.pop(todo);
        $scope.newTodo = { label: todo.label }
        $scope.message = "Something went wrong, we could not create your todo.";
        $scope.messageClass = ERROR_MESSAGE_CLASS;
      }
    );

    // optimistically append to the end of our list
    $scope.todos.push(todo);
    $scope.newTodo = {};
    $scope.message = "";
    $scope.messageClass = EMPTY_MESSAGE_CLASS;
  }

  $scope.toggleDone = function(todo) {
    todo.done = !todo.done;

    todo.$update(
      function() { 
        var doneText = todo.done ? 'Complete' : 'Incomplete';
        $scope.message = todo.label + " Successfully Marked As " + doneText + "!";
        $scope.messageClass = SUCCESS_MESSAGE_CLASS;
      },
      function() {
        $scope.message = "Something went wrong, we could not update your todo.";
        $scope.messageClass = ERROR_MESSAGE_CLASS;
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
        $scope.messageClass = SUCCESS_MESSAGE_CLASS;
      },
      function() { 
        $scope.message = "Something went wrong, we could not delete your todo."; 
        $scope.messageClass = ERROR_MESSAGE_CLASS;
        $scope.todos.push(todo);
      }
    );
  }

  $scope.isValid = function () {

    if($scope.newTodo == undefined || $scope.newTodo.label == "") {
      $scope.message = "Todo cannot be blank!";
      $scope.messageClass = ERROR_MESSAGE_CLASS;
      return false;
    }

    // check the uniqueness of the todo
    for(var i = 0; i < $scope.todos.length; i++) {
      if( $scope.todos[i].label.toLowerCase() == $scope.newTodo.label.toLowerCase() ) {
        $scope.message = "You already have to do " + $scope.newTodo.label + "!";
        $scope.messageClass = ERROR_MESSAGE_CLASS;
        return false;
      }
    }

    // the object is valid if we make it here
    return true;
  }

};

