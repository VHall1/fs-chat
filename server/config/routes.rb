Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :messages
  resources :users
  resources :channels, only: %i[index create update destroy]

  namespace :auth do
    post :register
    post :login
    delete :logout
    get :me
  end
end
