json.data do
  json.array! @messages do |message|
    json.partial! '/message', message: message
    json.user do
      json.extract! message.user, :username, :discriminator
    end
  end
end
json.nextCursor @messages.last&.id
