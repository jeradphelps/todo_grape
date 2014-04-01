TodoGrape::Application.routes.draw do
  root "pages#index"
  namespace :api do
    mount Todos::API => '/'
  end
end
