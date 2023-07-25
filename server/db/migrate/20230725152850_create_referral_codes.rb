class CreateReferralCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :referral_codes, id: :uuid do |t|
      t.string :code, null: false
      t.uuid :user_id, null: false
      t.uuid :channel_id, null: false
      t.integer :uses, null: false, default: 0

      t.timestamps
    end

    add_index :referral_codes, :code, unique: true
    add_foreign_key :referral_codes, :users
    add_foreign_key :referral_codes, :channels

    add_column :users, :referred_by_id, :uuid, null: true
    add_foreign_key :users, :referral_codes, column: :referred_by_id
  end
end
