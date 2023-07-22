class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels, id: :uuid do |t|
      t.string :name, null: false
      t.uuid :owner_id, null: false

      t.timestamps
    end

    add_index :channels, :name, unique: true
    add_foreign_key :channels, :users, column: :owner_id
  end
end
