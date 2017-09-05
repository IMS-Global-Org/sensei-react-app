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
#  student_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Phone < ApplicationRecord
  belongs_to :student

  validates_presence_of :phone_number, :type_of, :owner_of
  validates :texting, inclusion: { in: [true, false] }
  validates :active, inclusion: { in: [true, false] }
end
