# == Schema Information
#
# Table name: announcements
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  category     :string           not null
#  message      :string           not null
#  extra        :text
#  start_date   :date             not null
#  end_date     :date             not null
#  link         :string
#  cost         :float
#  registration :boolean
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Announcement < ApplicationRecord
  validates_presence_of :title, :category, :message,
                        :start_date, :end_date
  validates :extra, presence: true, allow_blank: true
  validates :link, presence: true, allow_blank: true
  validates :cost, presence: true, allow_blank: true, numericality: true
  validates :registration, inclusion: { in: [1, 0] }
end
