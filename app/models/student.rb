# == Schema Information
#
# Table name: students
#
#  id         :integer          not null, primary key
#  first      :string           not null
#  last       :string           not null
#  birthday   :date             not null
#  gender     :string           not null
#  photo      :string
#  belt       :string
#  level      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Student < ApplicationRecord
  include Pdfable # for generating a pdf file from the model/set

  validates_presence_of :first, :last, :gender, :birthday
  validates :photo, presence: true, allow_blank: true
  validates :belt, presence: true, allow_blank: true
  validates :level, presence: true, allow_blank: true

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
