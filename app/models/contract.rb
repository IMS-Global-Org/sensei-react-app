class Contract < ApplicationRecord
  belongs_to :contractee

  has_many :payments, dependent: :destroy
  validates_associated :payments, allow_blank: true
  accepts_nested_attributes_for :payments, allow_destroy: true

  validates_presence_of :start_date, :end_date
  validates :amount, format: { with: /^\d?\d\d\.\d\d/ }
  validates :interval, inclusion: { in: [6, 12] } # number of months
  validates :status, inclusion: { in: [true, false] }
end
