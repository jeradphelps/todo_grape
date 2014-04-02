#Todo Grape

This application implements both a Grape api mounted on rails and an angular client.  
Though the client and the api are housed within the same app, the client uses the api endpoints just as if it were a completely separate application.

## To Run Locally

    > git clone https://github.com/jeradphelps/todo_grape.git
    > cd todo_grape
    > bundle
    > rake db:migrate
    > rails s
    > in your browser, visit http://localhost:3000
    
## API Endpoints

### Todos
version=v1, method=GET, path=/todos(.:format)  
version=v1, method=GET, path=/todos/:id(.:format)  
version=v1, method=POST, path=/todos(.:format)  
version=v1, method=PUT, path=/todos/:id(.:format)  
version=v1, method=DELETE, path=/todos/:id(.:format)  

### Access Tokens
"version=v1, method=POST, path=/access_tokens(.:format)"

## Generate Endpoint List

    > rails c
    > API::Root::routes.map { |r| r.to_s }

## Full API Endpoint Docs

    > rails s
    > In your browser, visit: http://localhost:3000/apidoc

## Authentication

### API

The todo endpoints have a very simple authentication scheme implemented.  The non-get methods need an access token to be passed as a parameter with each request.  If that access token is found in the database, the request will proceed.  Else a 401 Unauthorized error will be thrown.

A client application can request an api key using the access_token POST method.  This method requires a username and password as arguments.  If username and password validation succeeds, an access token is passed back to the requester.

As this app is just an example, there is no user/password store.  Passing "username" and "password" will authenticate your request.

### Angular Client

The angular client implements the authentication scheme described above.  Upon loading the page, a GET /todos request proceeds without authorization.  Upon entering the username/password & clicking login, a POST request is made to the /access_tokens endpoint and the app receives a token assuming the username/password were valid.  This token is then stored in a singleton AccessTokens Angular service and passed by default to all future requests made by the application by utilizing the default params of the Todo resource.  When the page is refreshed, the user will need to log in again so the application may retrieve another access token.


## Run Tests!

    > bundle exec rspec
    
## Interesting Things
* Grape as a Rack app v Grape on Rails
* Angular

