class CreateJoinTableContractPayment < ActiveRecord::Migration[5.1]
  def change
    create_join_table :contracts, :payments do |t|
      t.index [:contract_id, :payment_id]
      # t.index [:payment_id, :contract_id]
    end
  end
end
