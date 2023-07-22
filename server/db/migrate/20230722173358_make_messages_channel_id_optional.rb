class MakeMessagesChannelIdOptional < ActiveRecord::Migration[7.0]
  def change
    change_column :messages, :channel_id, :integer
  end
end
