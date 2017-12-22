# == Schema Information
#
# Table name: contractees
#
#  id         :integer          not null, primary key
#  first      :string           not null
#  last       :string           not null
#  active     :integer          default(1), not null
#  birthdate  :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Contractee < ApplicationRecord
  has_and_belongs_to_many :contracts

  validates_presence_of :first, :last
  validates_presence_of :active, inclusion: { in: [1,0] }
  validates :birthdate, presence: true, allow_blank: true

  has_and_belongs_to_many :addresses, dependent: :destroy
  validates_associated :addresses, allow_blank: true
  accepts_nested_attributes_for :addresses, allow_destroy: true

  has_and_belongs_to_many :emails, dependent: :destroy
  validates_associated :emails, allow_blank: true
  accepts_nested_attributes_for :emails, allow_destroy: true

  has_and_belongs_to_many :phones, dependent: :destroy
  validates_associated :phones, allow_blank: true
  accepts_nested_attributes_for :phones, allow_destroy: true
end
