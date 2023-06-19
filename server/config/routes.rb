Rails.application.routes.draw do
  resources :messages
  resources :users

  namespace :auth do
    get :authenticate
    get :me
  end
end
