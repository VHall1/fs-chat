class AuthController < ApplicationController
  include AuthConcern

  before_action :require_login, only: %i[me]

  def register
    user = User.new(
      email: params[:email],
      username: params[:username],
      password: params[:password]
    )

    if user.save
      session[:user_id] = user.id
      render 'register', locals: { user: }, formats: :json
    else
      render json: { error: user.errors.full_messages }, status: :bad_request
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render 'login', locals: { user: }, formats: :json
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def logout
    session[:user_id] = nil
    render json: { message: 'Logged out' }
  end

  def me
    render 'login', locals: { user: current_user }, formats: :json
  end
end
