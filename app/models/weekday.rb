# == Schema Information
#
# Table name: weekdays
#
#  id         :integer          not null, primary key
#  Sun        :integer          default(0)
#  Mon        :integer          default(0)
#  Tue        :integer          default(0)
#  Wed        :integer          default(0)
#  Thu        :integer          default(0)
#  Fri        :integer          default(0)
#  Sat        :integer          default(0)
#  event_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Weekday < ApplicationRecord

  validates :Sun, presence: true, inclusion: { in: [1,0] } # true, false
  validates :Mon, presence: true, inclusion: { in: [1,0] } # true, false
  validates :Tue, presence: true, inclusion: { in: [1,0] } # true, false
  validates :Wed, presence: true, inclusion: { in: [1,0] } # true, false
  validates :Thu, presence: true, inclusion: { in: [1,0] } # true, false
  validates :Fri, presence: true, inclusion: { in: [1,0] } # true, false
  validates :Sat, presence: true, inclusion: { in: [1,0] } # true, false

  scope :listWeekdays, -> { select(:Mon, :Tue, :Wed, :Thu, :Fri) }
  scope :listWeekend, -> { select(:Sun, :Sat) }

end
