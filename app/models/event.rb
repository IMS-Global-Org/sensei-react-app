# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  start       :datetime         not null
#  finish      :datetime         not null
#  title       :string           not null
#  description :string
#  category    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Event < ApplicationRecord
  validates_presence_of :start, :finish, :title, :category
  validates_presence_of :description, allow_blank: true
end
