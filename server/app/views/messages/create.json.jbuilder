json.partial! '/message', message: message
json.user do
  json.extract! message.user, :id, :username
end
