class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # if you named your devise dog, it would be auth_dog!
  before_action :authenticate_user!
end
