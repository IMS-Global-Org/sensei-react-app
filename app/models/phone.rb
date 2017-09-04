class Phone < ApplicationRecord
  belongs_to :student
  
  validates_presence_of :type, :owner
  validates :text, inclusion: { in: [true, false] }
  validates :active, inclusion: { in: [true, false] }
  validates :number, numericality: { only: integer, greater_than: 0 }
end
