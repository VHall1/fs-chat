class ReferralCodesController < ApplicationController
  before_action :set_referral_code, only: %i[ claim ]
  before_action :require_login!

  def claim
    if current_user.active?
      render json: { error: 'Your account has already been activated' }, status: :bad_request
      return
    end

    # very easy to brute force, but this is just a demo
    if @referral_code.nil?
      render json: { error: 'Invalid referral code' }, status: :bad_request
      return
    end

    if @referral_code.user_id == current_user.id
      render json: { error: 'You cannot use your own referral code' }, status: :bad_request
      return
    end

    current_user.update!(referred_by: @referral_code, active: true, channels: [@referral_code.channel])
    @referral_code.update!(uses: @referral_code.uses + 1)

    render json: { message: 'Referral code claimed' }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_referral_code
    @referral_code = ReferralCode.find_by(code: params[:code])
  end
end
