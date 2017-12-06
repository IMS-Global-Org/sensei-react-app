class CreateEmails < ActiveRecord::Migration[5.1]
  def change
    create_table :emails do |t|
      t.string :address, null: false
      t.string :type_of, null: false
      t.string :owner_of, null: false
      t.integer :html, default: true
      t.integer :active, default: true

      t.timestamps
    end
  end
end
