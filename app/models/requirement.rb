# == Schema Information
#
# Table name: requirements
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :string
#  level       :string           not null
#  program_id  :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Requirement < ApplicationRecord
  belongs_to :program
  validates_presence_of :title, :level
  validates :description, presence: true, allow_blank: true
end
