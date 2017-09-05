class CreatePhones < ActiveRecord::Migration[5.1]
  def change
    create_table :phones do |t|
      t.string :phone_number, null: false
      t.string :type_of, null: false
      t.string :owner_of, null: false
      t.boolean :texting, default: true
      t.boolean :active, default: true
      t.belongs_to :student, foreign_key: true, index: true

      t.timestamps
    end
  end
end
