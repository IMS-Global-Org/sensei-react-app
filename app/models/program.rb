class Program < ApplicationRecord
  validate_presence_of :title, :level, :description

  has_many :requirements
  validates_associated :requirements, allow_blank: true
  accepts_attributes_for :requirements, reject_if: :all_blank, dependent: :destroy
end
