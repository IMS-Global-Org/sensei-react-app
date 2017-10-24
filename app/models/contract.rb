# == Schema Information
#
# Table name: contracts
#
#  id         :integer          not null, primary key
#  start_date :datetime         not null
#  end_date   :datetime         not null
#  amount     :float            not null
#  interval   :integer          not null
#  status     :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Contract < ApplicationRecord

  has_many :contractees, through: :contractee_contract

  has_and_belongs_to_many :payments, dependent: :destroy
  validates_associated :payments, allow_blank: true
  accepts_nested_attributes_for :payments, allow_destroy: true

  validates_presence_of :start_date, :end_date
  validates :amount, format: { with: /\d\d\.\d\d/ }
  validates :interval, inclusion: { in: [6, 12] } # number of months
  validates :status, inclusion: { in: [1, 0] }
end
