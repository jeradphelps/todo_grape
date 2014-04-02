TodoGrape::Application.routes.draw do
  root "pages#index"
  namespace :api do
    mount API::Root => '/'
  end
end
