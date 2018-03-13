class CreateContactEmails < ActiveRecord::Migration[5.1]
  def change
    create_table :contact_emails do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :address, null: false
      t.string :subject, null: false
      t.text :body, null: false
      t.string :phone
      t.integer :correspondance, default: 0

      t.timestamps
    end
  end
end
