user = User.find_by(email: 'victorhallpsn@hotmail.com')
channel = Channel.create(name: 'general', owner: user)

Message.all.each do |m|
  m.update(channel:)
end
