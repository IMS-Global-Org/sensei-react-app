class CreateRequirements < ActiveRecord::Migration[5.1]
  def change
    create_table :requirements do |t|
      t.string :title, null: false
      t.string :description
      t.integer :level, null: false
      t.belongs_to :program, foreign_key: true, index: true

      t.timestamps
    end
  end
end
