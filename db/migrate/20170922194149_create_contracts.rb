class CreateContracts < ActiveRecord::Migration[5.1]
  def change
    create_table :contracts do |t|
      t.timestamp :start_date, null: false
      t.timestamp :end_date, null: false
      t.float :amount, null: false
      t.integer :interval, null: false
      t.integer :status, null: 0

      t.timestamps
    end
  end
end