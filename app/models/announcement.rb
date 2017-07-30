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
end
