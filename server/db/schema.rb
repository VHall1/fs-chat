# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_22_172644) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.index ["name"], name: "index_channels_on_name", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.string "content"
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "channel_id", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
  end

  create_table "user_channels", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", limit: 32
    t.integer "discriminator", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: false
    t.string "password_digest"
  end

  add_foreign_key "channels", "users", column: "owner_id"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "user_channels", "channels"
  add_foreign_key "user_channels", "users"
end
