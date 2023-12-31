class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    enable_extension 'pgcrypto'

    create_table :users, id: :uuid do |t|
      t.string :email
      t.string :username, limit: 32, null: false
      t.integer :discriminator, limit: 4, null: false

      t.timestamps
    end
  end
end
