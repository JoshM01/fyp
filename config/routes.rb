Rails.application.routes.draw do
  root 'home#index'
  get 'about', to: 'about#index'
end
