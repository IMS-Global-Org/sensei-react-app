class CreateContractees < ActiveRecord::Migration[5.1]
  def change
    create_table :contractees do |t|
      t.string :first, null: false
      t.string :last, null: false
      t.timestamp :birthdate

      t.timestamps
    end
  end
end
