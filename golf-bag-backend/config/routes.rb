Rails.application.routes.draw do
  resources :bags do
    resources :clubs
  end

end
