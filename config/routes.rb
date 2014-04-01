TodoGrape::Application.routes.draw do
  namespace :api do
    mount Todos::API => '/'
  end
end
