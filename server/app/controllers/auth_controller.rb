class AuthController < ApplicationController
  include AuthConcern

  before_action :require_login, only: [:me]

  def authenticate
    params.require([:username, :discriminator])

    user = User.find_by(
      username: params[:username],
      discriminator: params[:discriminator]
    )

    if user.nil?
      render json: { error: 'Invalid username or discriminator' }, status: :not_found
      return
    end

    session[:user_id] = user.id
    render json: user
    # redirect_to OAuth::GitHub.authorize_url
  end

  # def callback
  #   params.require(:code)

  #   token = OAuth::GitHub.get_token(params[:code])
  #   github_user = OAuth::GitHub.get_user(token)

  #   User.find_or_create_by(email: github_user["email"])

  #   respond_to do |format|
  #     format.json ''
  #   end
  # end

  def me
    render json: current_user
  end
end
