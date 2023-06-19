module AuthConcern
  extend ActiveSupport::Concern

  def require_login
    return if current_user

    flash[:error] = 'You must be logged in to access this section'
    redirect_to login_path # change this to your login page path
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
