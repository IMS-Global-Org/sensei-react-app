class CreateHomePagePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :home_page_photos do |t|
      t.string :title, null: false
      t.text :description
      t.attachment :photo, null: false
      t.integer :active, null: false
      t.integer :viewable, null: false
      t.belongs_to :home_page_posting, foreign_key: true

      t.timestamps
    end
  end
end
