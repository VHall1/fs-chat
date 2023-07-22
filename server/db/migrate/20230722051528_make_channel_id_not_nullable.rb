class MakeChannelIdNotNullable < ActiveRecord::Migration[7.0]
  def change
    change_column :messages, :channel_id, :integer, :null => false
  end
end
