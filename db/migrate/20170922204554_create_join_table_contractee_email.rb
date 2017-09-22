class CreateJoinTableContracteeEmail < ActiveRecord::Migration[5.1]
  def change
    create_join_table :contractees, :emails do |t|
      t.index [:contractee_id, :email_id]
      # t.index [:email_id, :contractee_id]
    end
  end
end
