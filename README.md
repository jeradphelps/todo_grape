#Todo Grape

A Grape api mounted on rails with an angular front end.  

## To Run Locally

    > git clone https://github.com/jeradphelps/todo_grape.git
    > bundle
    > rake db:migrate
    > rails s
    
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

