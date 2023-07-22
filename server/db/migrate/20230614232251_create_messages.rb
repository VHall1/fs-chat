class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages, id: :uuid do |t|
      t.string :content
      t.uuid :user_id, null: false

      t.timestamps
    end

    add_index :messages, :user_id
    add_foreign_key :messages, :users
  end
end
