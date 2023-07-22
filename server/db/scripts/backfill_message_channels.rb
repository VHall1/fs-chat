user = User.find_by(email: 'victorhallpsn@hotmail.com')
channel = user.owned_channels.create(name: 'general')
Message.all.each do |m|
  m.update(channel:)
end
