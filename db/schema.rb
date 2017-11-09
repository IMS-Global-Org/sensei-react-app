# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170926203012) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "street1", null: false
    t.string "street2"
    t.string "city", null: false
    t.string "state", null: false
    t.string "zipcode", null: false
    t.string "type_of", default: "Home", null: false
    t.string "owner_of", default: "Parent", null: false
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "addresses_contractees", id: false, force: :cascade do |t|
    t.bigint "contractee_id", null: false
    t.bigint "address_id", null: false
    t.index ["contractee_id", "address_id"], name: "index_addresses_contractees_on_contractee_id_and_address_id"
  end

  create_table "addresses_students", id: false, force: :cascade do |t|
    t.bigint "student_id", null: false
    t.bigint "address_id", null: false
    t.index ["student_id", "address_id"], name: "index_addresses_students_on_student_id_and_address_id"
  end

  create_table "announcements", force: :cascade do |t|
    t.string "title", null: false
    t.string "category", null: false
    t.string "message", null: false
    t.text "extra"
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.string "link"
    t.float "cost"
    t.boolean "registration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contractees", force: :cascade do |t|
    t.string "first", null: false
    t.string "last", null: false
    t.datetime "birthdate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contractees_contracts", id: false, force: :cascade do |t|
    t.bigint "contractee_id", null: false
    t.bigint "contract_id", null: false
    t.index ["contractee_id", "contract_id"], name: "index_contractees_contracts_on_contractee_id_and_contract_id"
  end

  create_table "contractees_emails", id: false, force: :cascade do |t|
    t.bigint "contractee_id", null: false
    t.bigint "email_id", null: false
    t.index ["contractee_id", "email_id"], name: "index_contractees_emails_on_contractee_id_and_email_id"
  end

  create_table "contractees_phones", id: false, force: :cascade do |t|
    t.bigint "contractee_id", null: false
    t.bigint "phone_id", null: false
    t.index ["contractee_id", "phone_id"], name: "index_contractees_phones_on_contractee_id_and_phone_id"
  end

  create_table "contracts", force: :cascade do |t|
    t.datetime "start_date", null: false
    t.datetime "end_date", null: false
    t.float "amount", null: false
    t.integer "interval", null: false
    t.integer "status", default: 0, null: false
    t.integer "archived", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contracts_payments", id: false, force: :cascade do |t|
    t.bigint "contract_id", null: false
    t.bigint "payment_id", null: false
    t.index ["contract_id", "payment_id"], name: "index_contracts_payments_on_contract_id_and_payment_id"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "emails", force: :cascade do |t|
    t.string "address", null: false
    t.string "type_of", null: false
    t.string "owner_of", null: false
    t.boolean "html", default: true
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "emails_students", id: false, force: :cascade do |t|
    t.bigint "student_id", null: false
    t.bigint "email_id", null: false
    t.index ["student_id", "email_id"], name: "index_emails_students_on_student_id_and_email_id"
  end

  create_table "events", force: :cascade do |t|
    t.datetime "start", null: false
    t.datetime "finish", null: false
    t.string "title", null: false
    t.string "description"
    t.string "category", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "home_page_links", force: :cascade do |t|
    t.string "title", null: false
    t.string "url", null: false
    t.string "abbreviation"
    t.text "description", null: false
    t.bigint "home_page_posting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["home_page_posting_id"], name: "index_home_page_links_on_home_page_posting_id"
  end

  create_table "home_page_postings", force: :cascade do |t|
    t.string "title", null: false
    t.text "message", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "home_page_videos", force: :cascade do |t|
    t.string "title", null: false
    t.string "identifier", null: false
    t.string "source", null: false
    t.text "notes"
    t.bigint "home_page_posting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["home_page_posting_id"], name: "index_home_page_videos_on_home_page_posting_id"
  end

  create_table "mailers", force: :cascade do |t|
    t.string "title", null: false
    t.string "interval", null: false
    t.string "type_of", null: false
    t.boolean "active", default: true, null: false
    t.string "recipients", null: false
    t.string "subject"
    t.boolean "notify", default: false, null: false
    t.string "job"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payments", force: :cascade do |t|
    t.datetime "charged", null: false
    t.string "method", null: false
    t.float "amount", null: false
    t.boolean "verified", null: false
    t.bigint "contract_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contract_id"], name: "index_payments_on_contract_id"
  end

  create_table "phones", force: :cascade do |t|
    t.string "phone_number", null: false
    t.string "type_of", null: false
    t.string "owner_of", null: false
    t.boolean "texting", default: true
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "phones_students", id: false, force: :cascade do |t|
    t.bigint "student_id", null: false
    t.bigint "phone_id", null: false
    t.index ["student_id", "phone_id"], name: "index_phones_students_on_student_id_and_phone_id"
  end

  create_table "programs", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "level", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requirements", force: :cascade do |t|
    t.string "title", null: false
    t.string "description"
    t.integer "level", null: false
    t.bigint "program_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["program_id"], name: "index_requirements_on_program_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "first", null: false
    t.string "last", null: false
    t.date "birthday", null: false
    t.string "gender", null: false
    t.string "photo"
    t.string "belt"
    t.string "level"
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.string "permissions", default: "user"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "home_page_links", "home_page_postings"
  add_foreign_key "home_page_videos", "home_page_postings"
  add_foreign_key "payments", "contracts"
  add_foreign_key "requirements", "programs"
end
