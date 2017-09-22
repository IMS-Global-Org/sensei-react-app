class Payment < ApplicationRecord
  belongs_to :contract

  validates_presence_of :date
  validates :method, inclusion: { in: %w[Cash Check Visa Mastercard Discovery MoneyOrder] }
  validates :amount, format: { with: /^\d?\d\d\.\d\d/ }
  validates :verified, inclusion: { in: [true,false] }
end
