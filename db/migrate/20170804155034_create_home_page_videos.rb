class CreateHomePageVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :home_page_videos do |t|
      t.string :title, null: false
      t.string :id, null: false
      t.string :source, null: false
      t.belongs_to :home_page_posting, foreign_key: true

      t.timestamps
    end
  end
end
