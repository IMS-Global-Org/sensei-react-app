class CreateJoinTableStudentsAddresses < ActiveRecord::Migration[5.1]
  def change
    create_join_table :students, :addresses do |t|
      t.index [:student_id, :address_id]
      # t.index [:address_id, :student_id]
    end
  end
end
