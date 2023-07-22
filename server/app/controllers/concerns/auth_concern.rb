module AuthConcern
  extend ActiveSupport::Concern

  def require_login!
    return if current_user

    render json: { error: 'Not logged in' }, status: :unauthorized
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
