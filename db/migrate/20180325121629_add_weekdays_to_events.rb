class AddWeekdaysToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :weekdays, :string
  end
end
