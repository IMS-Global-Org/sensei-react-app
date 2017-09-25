class Contractee < ApplicationRecord
  validates_presence_of :first, :last
  validates :birthdate, presence: true, allow_blank: true

  has_and_belongs_to_many :addresses
  has_and_belongs_to_many :emails
  has_and_belongs_to_many :phones
  has_and_belongs_to_many :contracts

  # has_many :addresses, dependent: :destroy
  # has_many :phones, dependent: :destroy
  # has_many :emails, dependent: :destroy
  #
  # validates_associated :phones, allow_blank: true
  # validates_associated :addresses, allow_blank: true
  # validates_associated :emails, allow_blank: true
  #
  # accepts_nested_attributes_for :phones, allow_destroy: true
  # accepts_nested_attributes_for :emails, allow_destroy: true
  # accepts_nested_attributes_for :addresses, allow_destroy: true
end
