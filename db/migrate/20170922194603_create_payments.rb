class CreatePayments < ActiveRecord::Migration[5.1]
  def change
    create_table :payments do |t|
      t.timestamp :charged, null: false
      t.string :method, null: false
      t.float :amount, null: false
      t.boolean :verified, null: false
      t.belongs_to :contract, foreign_key: true

      t.timestamps
    end
  end
end
