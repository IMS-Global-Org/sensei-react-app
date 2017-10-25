# == Schema Information
#
# Table name: contractees
#
#  id         :integer          not null, primary key
#  first      :string           not null
#  last       :string           not null
#  birthdate  :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Contractee < ApplicationRecord
  validates_presence_of :first, :last
  validates :birthdate, presence: true, allow_blank: true

  has_and_belongs_to_many :addresses, dependent: :destroy
  has_and_belongs_to_many :emails, dependent: :destroy
  has_and_belongs_to_many :phones, dependent: :destroy

  has_many :contracts, through: :contractee_contract

  validates_associated :phones, allow_blank: true
  validates_associated :addresses, allow_blank: true
  validates_associated :emails, allow_blank: true
  validates_associated :contracts, allow_blank: true

  accepts_nested_attributes_for :phones, allow_destroy: true
  accepts_nested_attributes_for :emails, allow_destroy: true
  accepts_nested_attributes_for :addresses, allow_destroy: true
  accepts_nested_attributes_for :contracts, allow_destroy: true
end