class CreateAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :announcements do |t|
      t.string :title, null: false
      t.string :category, null: false
      t.string :message, null: false
      t.text :extra
      t.timestamp :start_date, null: false
      t.timestamp :end_date, null: false
      t.string :link
      t.float :cost
      t.integer :registration

      t.timestamps
    end
  end
end
