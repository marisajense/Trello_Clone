Rails.application.routes.draw do
  get 'lists/index'

  get 'lists/show'

  # Root Route
  root 'boards#index'

  # Devise Routes
  devise_for :users

  # Resources Routes
  resources :boards do
    resources :lists
  end

  #Custom GET Routes
  #Custom POST Routes
  #Custom PUT Routes
  #Custom DELETE Routes

end
