class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :content
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :messages, :user_id
    add_foreign_key :messages, :users
  end
end
