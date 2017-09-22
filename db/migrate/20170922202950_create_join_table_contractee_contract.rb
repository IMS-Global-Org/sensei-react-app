class CreateJoinTableContracteeContract < ActiveRecord::Migration[5.1]
  def change
    create_join_table :contractees, :contracts do |t|
      t.index [:contractee_id, :contract_id]
      # t.index [:contract_id, :contractee_id]
    end
  end
end
