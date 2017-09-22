class CreateJoinTableContracteePhone < ActiveRecord::Migration[5.1]
  def change
    create_join_table :contractees, :phones do |t|
      t.index [:contractee_id, :phone_id]
      # t.index [:phone_id, :contractee_id]
    end
  end
end
