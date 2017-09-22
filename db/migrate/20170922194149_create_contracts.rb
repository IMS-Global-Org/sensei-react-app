class CreateContracts < ActiveRecord::Migration[5.1]
  def change
    create_table :contracts do |t|
      t.timestamp :start_date, null: false
      t.timestamp :end_date, null: false
      t.float :amount, null: false
      t.integer :interval, null: false
      t.boolean :status, null: false
      t.belongs_to :contractee, foreign_key: true

      t.timestamps
    end
  end
end
