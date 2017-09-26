class CreateJoinTableStudentsEmails < ActiveRecord::Migration[5.1]
  def change
    create_join_table :students, :emails do |t|
      t.index [:student_id, :email_id]
      # t.index [:email_id, :student_id]
    end
  end
end
