class CreateJoinTableStudentsPhones < ActiveRecord::Migration[5.1]
  def change
    create_join_table :students, :phones do |t|
      t.index [:student_id, :phone_id]
      # t.index [:phone_id, :student_id]
    end
  end
end
