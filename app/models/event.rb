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
  WEEKDAYS = %i(Mon Tue Wed Thu Fri Sat Sun)

  validates_presence_of :start, :finish, :title, :category
  validates_presence_of :description, allow_blank: true
  validates_each :weekdays, presence: true, allow_blank: true do |record,attr,value|
    record.errors.add(attr,"Weekdays must be one of: #{WEEKDAYS.join(', ')}") if
      value.split(',').all?{ |day| WEEKDAYS.include?(day) }
  end
end
