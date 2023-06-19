Rails.application.routes.draw do
  resources :messages
  resources :users

  namespace :auth do
    post :authenticate
    get :me
  end
end
