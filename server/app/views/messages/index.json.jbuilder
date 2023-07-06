json.data do
  json.array! @messages do |message|
    json.partial! '/message', message: message
    json.user do
      json.extract! message.user, :id, :username
    end
  end
end
json.nextCursor @messages.last&.id
