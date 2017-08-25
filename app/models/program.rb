# == Schema Information
#
# Table name: programs
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  level       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Program < ApplicationRecord
  validates_presence_of :title, :level, :description

  has_many :requirements, dependent: :destroy
  validates_associated :requirements, allow_blank: true
  accepts_nested_attributes_for :requirements, reject_if: :all_blank, allow_destroy: true
end
