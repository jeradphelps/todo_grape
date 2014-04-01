var app = angular.module("Todo", ["ngResource"]);
app.factory("Todo", function($resource) {
  return $resource("/api/todos/:id", 
    { id: "@id" },
    { update: { method: "PUT" } }
  );
});

this.TodoController = function($scope, Todo) {
  $scope.todos = Todo.query(
    function() {  },
    function() { $scope.message = "Something went wrong. Please reload the page"; }
  );

  $scope.addTodo = function() {

    // validate our input
    // abort our save if we fail
    // blah write tests for these!
    if($scope.newTodo == undefined) {
      $scope.message = "Todo cannot be blank!";
      return;
    } else {
      for(var i = 0; i < $scope.todos.length; i++) {
        if( $scope.todos[i].label.toLowerCase() == $scope.newTodo.label.toLowerCase() ) {
          $scope.message = "You already have to do that!";
          return;
        }
      }
    }

    var todo = Todo.save($scope.newTodo,
      function() {  },
      function() {
        // our save failed
        // take off what we've already appended
        $scope.todos.pop(todo);
      }
    );

    // optimistically append to the end of our list
    $scope.todos.push(todo);
    $scope.newTodo = {};
  }

  $scope.toggleDone = function(todo) {
    todo.done = !todo.done;
    // blah move the validate stuff into a function
    todo.$update(
      function() { console.log("success in upder"); },
      function() { console.log("failer in upder"); }
    );
  }

  $scope.delete = function(todo) {
    todo.$delete(
      function() {  },
      function() { $scope.message = "Something went wrong. Please reload the page"; }
    );

    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);
  }

  $scope.validateTodo = function () {

  }
};

