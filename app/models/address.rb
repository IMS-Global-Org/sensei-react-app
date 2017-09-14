# == Schema Information
#
# Table name: addresses
#
#  id         :integer          not null, primary key
#  street1    :string           not null
#  street2    :string
#  city       :string           not null
#  state      :string           not null
#  zipcode    :string           not null
#  type_of    :string           default("Home"), not null
#  owner_of   :string           default("Parent"), not null
#  active     :boolean          default(TRUE)
#  student_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Address < ApplicationRecord
  belongs_to :student

  validates_presence_of :street1, :city, :state, :zipcode
  validates_presence_of :type_of, :owner_of
  validates :street2, presence: true, allow_blank: true
end