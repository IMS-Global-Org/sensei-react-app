class Address < ApplicationRecord
  belongs_to :student

  validates_presence_of :street1, :city, :state, :zipcode, :type, :owner
  validates_presence_of :type, :owner
  validates :street2, allow_blank: true
end
