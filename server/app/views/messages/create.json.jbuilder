json.partial! '/message', message: message
json.author do
  json.extract! message.author, :id, :username
end
