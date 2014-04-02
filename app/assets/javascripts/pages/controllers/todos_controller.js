

// This controller manages the CRUD behavior of our Todo
// resource.
this.TodoController = function($scope, Todo, AccessToken) {

  $scope.todos = Todo.query(
    function() {  },
    function() { 
      $scope.setFlashMessage("Something went wrong, we could not fetch your todos.", $scope.ERROR_MESSAGE_CLASS);
    }
  );

  $scope.add = function() {
    if(!$scope.isValid()) {
      return false;
    }

    var todo = Todo.save($scope.newTodo,
      function() { 
        $scope.setFlashMessage(todo.label + " Successfully Created!", $scope.SUCCESS_MESSAGE_CLASS);
      },
      function() {
        // our save failed
        // take off what we've already appended
        $scope.todos.pop(todo);
        $scope.newTodo = { label: todo.label }
        $scope.setFlashMessage("Something went wrong, we could not create your todo.",$scope.ERROR_MESSAGE_CLASS);
      }
    );

    // optimistically append to the end of our list
    $scope.todos.push(todo);
    $scope.newTodo = { label: "" };
    $scope.setFlashMessage("",$scope.EMPTY_MESSAGE_CLASS);
  }

  // When the checkmark button is clicked for a given todo,
  // udpate the done boolean field of that record.
  $scope.toggleDone = function(todo) {
    todo.done = !todo.done;

    todo.$update(
      function() { 
        var doneText = todo.done ? 'Complete' : 'Incomplete';
        $scope.setFlashMessage(todo.label + " Successfully Marked As " + doneText + "!",$scope.SUCCESS_MESSAGE_CLASS);
      },
      function() {
        $scope.setFlashMessage("Something went wrong, we could not update your todo.", $scope.ERROR_MESSAGE_CLASS);
        todo.done = !todo.done;
      }
    );
  }

  $scope.delete = function(todo) {
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);

    todo.$delete(
      function() { 
        $scope.setFlashMessage(todo.label + " Successfully Deleted!", $scope.SUCCESS_MESSAGE_CLASS);
      },
      function() { 
        $scope.setFlashMessage("Something went wrong, we could not delete your todo.",$scope.ERROR_MESSAGE_CLASS);
        $scope.todos.push(todo);
      }
    );
  }

  $scope.isValid = function () {

    if($scope.newTodo == undefined || $scope.newTodo.label == "") {
      $scope.setFlashMessage("Todo cannot be blank!",$scope.ERROR_MESSAGE_CLASS);
      return false;
    }

    // check the uniqueness of the todo
    for(var i = 0; i < $scope.todos.length; i++) {
      if( $scope.todos[i].label.toLowerCase() == $scope.newTodo.label.toLowerCase() ) {
        $scope.setFlashMessage("You already have to do " + $scope.newTodo.label + "!",$scope.ERROR_MESSAGE_CLASS);
        return false;
      }
    }

    // the object is valid if we make it here
    return true;
  }


  // Wrap the access token service's have token method
  // so we can use it within handlebars.
  $scope.haveToken = function() {
    return AccessToken.haveToken();
  }

};