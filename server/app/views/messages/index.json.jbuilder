json.data do
  json.array! @messages do |message|
    json.partial! '/message', message: message
    json.author do
      json.extract! message.author, :id, :username
    end
  end
end
json.nextCursor @messages.last&.id
