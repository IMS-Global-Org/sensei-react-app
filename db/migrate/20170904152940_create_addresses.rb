class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :street1, null: false
      t.string :street2
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.string :type_of, null: false, default: 'Home'
      t.string :owner_of, null: false, default: 'Parent'
      t.boolean :active, default: true
      t.belongs_to :student, foreign_key: true, index: true

      t.timestamps
    end
  end
end
