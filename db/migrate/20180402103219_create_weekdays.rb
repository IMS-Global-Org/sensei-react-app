class CreateWeekdays < ActiveRecord::Migration[5.1]
  def change
    create_table :weekdays do |t|
      t.integer :Sun, default: 0
      t.integer :Mon, default: 0
      t.integer :Tue, default: 0
      t.integer :Wed, default: 0
      t.integer :Thu, default: 0
      t.integer :Fri, default: 0
      t.integer :Sat, default: 0
      t.belongs_to :event, foreign_key: true

      t.timestamps
    end
  end
end
