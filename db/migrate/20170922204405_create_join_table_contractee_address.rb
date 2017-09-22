class CreateJoinTableContracteeAddress < ActiveRecord::Migration[5.1]
  def change
    create_join_table :contractees, :addresses do |t|
      t.index [:contractee_id, :address_id]
      # t.index [:address_id, :contractee_id]
    end
  end
end
