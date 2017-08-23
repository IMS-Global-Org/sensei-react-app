class CreatePrograms < ActiveRecord::Migration[5.1]
  def change
    create_table :programs do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :level, null: false

      t.timestamps
    end
  end
end
