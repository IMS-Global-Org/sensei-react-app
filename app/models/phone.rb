# == Schema Information
#
# Table name: phones
#
#  id           :integer          not null, primary key
#  phone_number :string           not null
#  type_of      :string           not null
#  owner_of     :string           not null
#  texting      :boolean          default(TRUE)
#  active       :boolean          default(TRUE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Phone < ApplicationRecord
  validates_presence_of :phone_number, :type_of, :owner_of
  validates :texting, inclusion: { in: [true, false] }
  validates :active, inclusion: { in: [true, false] }

  has_and_belongs_to_many :students
  has_and_belongs_to_many :contractees

end
