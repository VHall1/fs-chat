Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :messages
  resources :users

  namespace :auth do
    post :register
    post :login
    delete :logout
    get :me
  end
end
