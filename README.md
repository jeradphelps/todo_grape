#Todo Grape

A Grape api mounted on rails with an angular front end.  
Grape can be run as a rack app, but for the sake of keeping the client and api in one appliation I mounted it to rails.  The Angular App uses the api endpoints just as if it were a completely disparate application.

## To Run Locally

    > git clone https://github.com/jeradphelps/todo_grape.git
    > bundle
    > rake db:migrate
    > rails s
    > in your browser, visit http://localhost:3000
    
## Todo Api endpoints

version=v1, method=GET, path=/todos(.:format)  
version=v1, method=GET, path=/todos/:id(.:format)  
version=v1, method=POST, path=/todos(.:format)  
version=v1, method=PUT, path=/todos/:id(.:format)  
version=v1, method=DELETE, path=/todos/:id(.:format)  

## Authentication

Does not exist yet

## Run Tests

    > bundle exec rspec
    
## Interesting Things
* Grape as a Rack app v Grape on Rails
* Angular

