class Email < ApplicationRecord
  belongs_to :student

  validates_presence_of :address, :type, :owner
  validates :html, allow_blank: true
  validagtes :active, allow_blank: true
end
