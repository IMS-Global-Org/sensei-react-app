class CreateHomePageVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :home_page_videos do |t|
      t.string :title, null: false
      t.string :identifier, null: false
      t.string :source, null: false
      t.text :notes
      t.belongs_to :home_page_posting, foreign_key: true, index: true

      t.timestamps
    end
  end
end
