class CreateEmails < ActiveRecord::Migration[5.1]
  def change
    create_table :emails do |t|
      t.string :address, null: false
      t.string :type_of, null: false
      t.string :owner_of, null: false
      t.boolean :html, default: true
      t.boolean :active, default: true
      t.belongs_to :student, foreign_key: true, index: true

      t.timestamps
    end
  end
end
