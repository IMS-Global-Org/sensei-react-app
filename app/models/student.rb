class Student < ApplicationRecord
  validates_presence_of :first, :last, :gender, :birthday
  validates :photo, allow_blank: true
  validates :belt, allow_blank: true
  validates :level, allow_blank: true

  has_many :phones, dependent: :destroy
  has_many :emails, dependent: :destroy
  has_many :addresses, dependent: :destroy

  validates_associated :phones, allow_blank: true
  validates_associated :emails, allow_blank: true
  validates_associated :addresses, allow_blank: true

  accepts_nested_attributes_for :phones, allow_destroy: true
  accepts_nested_attributes_for :emails, allow_destroy: true
  accepts_nested_attributes_for :addresses, allow_destroy: true
end
