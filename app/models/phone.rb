# == Schema Information
#
# Table name: phones
#
#  id           :integer          not null, primary key
#  phone_number :string           not null
#  type_of      :string           not null
#  owner_of     :string           not null
#  texting      :integer          default(1)
#  active       :integer          default(1)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Phone < ApplicationRecord
  validates_presence_of :phone_number, :type_of, :owner_of
  validates :texting, inclusion: { in: [1, 0] }
  validates :active, inclusion: { in: [1, 0] }

  has_and_belongs_to_many :students
  has_and_belongs_to_many :contractees

end
