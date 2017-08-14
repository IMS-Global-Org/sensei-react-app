class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.timestamp :start, null: false
      t.timestamp :finish, null: false
      t.string :title, null: false
      t.string :description
      t.string :category, null: false

      t.timestamps
    end
  end
end
