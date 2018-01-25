# == Schema Information
#
# Table name: payments
#
#  id          :integer          not null, primary key
#  charged     :datetime         not null
#  method      :string           not null
#  amount      :float            not null
#  verified    :boolean          not null
#  contract_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Payment < ApplicationRecord
  has_and_belongs_to_many :contracts

  validates_presence_of :charged
  validates :method, inclusion: { in: %w[Cash Check Visa Mastercard Discovery MoneyOrder] }
  validates :amount, format: { with: /\d\d\.\d\d/ }
  validates :verified, inclusion: { in: [0,1] }
end
