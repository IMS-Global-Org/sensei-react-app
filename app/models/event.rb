class Event < ApplicationRecord
  validates_presence_of :start, :finish, :title, :category
  validates_presence_of :description, allow_blank: true
end
