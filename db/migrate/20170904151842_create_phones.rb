class CreatePhones < ActiveRecord::Migration[5.1]
  def change
    create_table :phones do |t|
      t.integer :number, null: false
      t.string :type, null: false
      t.string :owner, null: false
      t.boolean :text, default: true
      t.boolean :active, default: true
      t.belongs_to :student, foreign_key: true, index: true

      t.timestamps
    end
  end
end
