class CreateHomePageLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :home_page_links do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.string :abbreviation
      t.text :description, null: false
      t.belongs_to :home_page_posting, foreign_key: true

      t.timestamps
    end
  end
end
