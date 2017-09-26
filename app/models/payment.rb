class Payment < ApplicationRecord
  has_and_belongs_to_many :contracts

  validates_presence_of :charged
  validates :method, inclusion: { in: %w[Cash Check Visa Mastercard Discovery MoneyOrder] }
  validates :amount, format: { with: /\d\d\.\d\d/ }
  validates :verified, inclusion: { in: [true,false] }
end
