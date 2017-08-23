class Requirement < ApplicationRecord
  belongs_to :program
  validate_presence_of :title, :level
  validate :description, allow_blank: true
end
