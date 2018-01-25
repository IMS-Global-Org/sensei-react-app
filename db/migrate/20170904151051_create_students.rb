class CreateStudents < ActiveRecord::Migration[5.1]
  def change
    create_table :students do |t|
      t.string :first, null: false
      t.string :last, null: false
      t.date :birthday, null: false
      t.string :gender, null: false
      t.string :photo
      t.string :belt
      t.string :level
      t.integer :active, null: false, default: 1

      t.timestamps
    end
  end
end
