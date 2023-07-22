class MessagesController < ApplicationController
  before_action :set_message, only: %i[show update destroy]
  before_action :set_channel!, only: %i[index create]
  before_action :require_login!

  # GET /messages
  def index
    if (cursor = params[:cursor])
      @messages = @channel.messages.where('id < ?', cursor).order(id: :desc).limit(25)
    else
      @messages = @channel.messages.order(id: :desc).limit(25)
    end

    render 'index', formats: :json
  end

  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    @message = current_user.messages.new(message_params)
    @message.channel = @channel

    if @message.save
      ActionCable.server.broadcast(
        'chat',
        render_to_string(template: 'messages/create', locals: { message: @message }, formats: :json)
      )
      head :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_message
    @message = Message.find(params[:id])
  end

  def set_channel!
    @channel = Channel.find(params[:channel_id] || params[:channelId])

    if @channel.nil?
      render json: { error: 'Channel not found' }, status: :not_found
    end
  end

  # Only allow a list of trusted parameters through.
  def message_params
    params.require(:message).permit(:content)
  end
end
