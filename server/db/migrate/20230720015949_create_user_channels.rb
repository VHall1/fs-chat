class CreateUserChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :user_channels, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.uuid :channel_id, null: false
      t.timestamps
    end

    add_foreign_key :user_channels, :users
    add_foreign_key :user_channels, :channels
  end
end
