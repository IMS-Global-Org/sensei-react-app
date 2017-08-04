class CreateHomePagePostings < ActiveRecord::Migration[5.1]
  def change
    create_table :home_page_postings do |t|
      t.string :title, null: false
      t.text :message, null: false

      t.timestamps
    end
  end
end
