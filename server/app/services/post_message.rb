class PostMessage
  def initialize(message:, user:)
    @message = message
    @user = user
  end

  def call
    Message.create!(content: @message, user: @user)
  end
end
