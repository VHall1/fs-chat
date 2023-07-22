class MoveMessagesToChannels < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :channel_id, :uuid
  end
end
