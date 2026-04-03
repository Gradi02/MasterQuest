Rails.application.routes.draw do
  resources :users, :certificates
  devise_for :users, defaults: { format: :json }
end
