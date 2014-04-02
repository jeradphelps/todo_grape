var app = angular.module("Todo", ["ngResource"]);

// Create a Todo resource to match our Todo api endpoints
app.factory("Todo", function($resource) {
  return $resource("/api/todos/:id", 
    { id: "@id" },
    { update: { method: "PUT" } }
  );
});

this.TodoController = function($scope, Todo) {
  $scope.todos = Todo.query(
    function() {  },
    function() { $scope.message = "Something went wrong, we could not fetch your todos."; }
  );

  $scope.add = function() {

    if(!$scope.isValid()) {
      return false;
    }

    var todo = Todo.save($scope.newTodo,
      function() { $scope.message = todo.label + " Successfully Created!" },
      function() {
        // our save failed
        // take off what we've already appended
        $scope.todos.pop(todo);
        $scope.newTodo = { label: todo.label }
        $scope.message = "Something went wrong, we could not create your todo.";
      }
    );

    // optimistically append to the end of our list
    $scope.todos.push(todo);
    $scope.newTodo = {};
    $scope.message = "";
  }

  $scope.toggleDone = function(todo) {
    todo.done = !todo.done;

    todo.$update(
      function() { 
        var doneText = todo.done ? 'Done' : 'Not Done';
        $scope.message = "Todo Successfully Marked As " + doneText + "!"; },
      function() {
        $scope.message = "Something went wrong, we could not update your todo.";
        todo.done = !todo.done;
      }
    );
  }

  $scope.delete = function(todo) {
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);

    todo.$delete(
      function() { $scope.message = todo.label + " Successfully Deleted!" },
      function() { 
        $scope.message = "Something went wrong, we could not delete your todo."; 
        $scope.todos.push(todo);
      }
    );
  }

  $scope.isValid = function () {

    if($scope.newTodo == undefined || $scope.newTodo.label == "") {
      $scope.message = "Todo cannot be blank!";
      return false;
    }

    // check the uniqueness of the todo
    for(var i = 0; i < $scope.todos.length; i++) {
      if( $scope.todos[i].label.toLowerCase() == $scope.newTodo.label.toLowerCase() ) {
        $scope.message = "You already have to do that!";
        return false;
      }
    }

    // the object is valid if we make it here
    return true;
  }

};

