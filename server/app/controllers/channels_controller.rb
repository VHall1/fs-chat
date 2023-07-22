class ChannelsController < ApplicationController
  before_action :set_channel, only: %i[update destroy]
  before_action :require_login!

  # GET /channels
  # GET /channels.json
  def index
    @channels = current_user.channels
    render 'index', formats: :json
  end

  # POST /channels
  # POST /channels.json
  def create
    @channel = current_user.owned_channels.new(channel_params)

    if @channel.save
      render :show, status: :created, location: @channel
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /channels/1
  # PATCH/PUT /channels/1.json
  def update
    if @channel.update(channel_params)
      render :show, status: :ok, location: @channel
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  # DELETE /channels/1
  # DELETE /channels/1.json
  def destroy
    @channel.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_channel
    @channel = current_user.owned_channels.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def channel_params
    params.require(:channel).permit(:name)
  end
end
