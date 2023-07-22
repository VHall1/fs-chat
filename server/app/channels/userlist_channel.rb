class UserlistChannel < ApplicationCable::Channel
  include AuthConcern

  def subscribed
    # stream_from 'userlist'
    # update_online_users_list('join')
    # send_online_users_list
  end

  def unsubscribed
    # update_online_users_list('leave')
  end

  private

  def update_online_users_list(action)
    ActionCable.server.broadcast('userlist', { action: action, user_id: current_user.id })
  end

  def send_online_users_list
    online_users = User.where(id: ActionCable.server.connections.map(&:current_user).compact.map(&:id))
    ActionCable.server.broadcast("userlist:#{current_user.id}", { users: online_users })
  end
end
