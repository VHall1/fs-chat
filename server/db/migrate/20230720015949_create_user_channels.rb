class CreateUserChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :user_channels do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false
      t.timestamps
    end

    add_foreign_key :user_channels, :users
    add_foreign_key :user_channels, :channels
  end
end
