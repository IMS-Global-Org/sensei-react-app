class CreateMailers < ActiveRecord::Migration[5.1]
  def change
    create_table :mailers do |t|
      t.string :title, null: false
      t.integer :interval, null: false
      t.string :type_of, null: false
      t.boolean :active, null: false, default: true
      t.string :recipients, null: false
      t.string :subject
      t.boolean :notify, null: false, default: false

      t.timestamps
    end
  end
end
