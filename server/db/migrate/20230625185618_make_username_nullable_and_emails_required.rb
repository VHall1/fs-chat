class MakeUsernameNullableAndEmailsRequired < ActiveRecord::Migration[7.0]
  def up
    change_column :users, :username, :string, :limit => 32, :null => true
    change_column :users, :email, :string, :null => false
  end

  def down
    change_column :users, :username, :string, :limit => 32, :null => false
    change_column :users, :email, :string, :null => true
  end
end
