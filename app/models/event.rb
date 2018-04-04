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
#  weekdays    :string
#

class Event < ApplicationRecord
  has_one :weekday

  validates_presence_of :start, :finish, :title, :category
  validates_presence_of :description, allow_blank: true

  accepts_nested_attributes_for :weekday, allow_destroy: true
  validates_associated :weekday, allow_blank: true

end
