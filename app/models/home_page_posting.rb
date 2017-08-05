# == Schema Information
#
# Table name: home_page_postings
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  message    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class HomePagePosting < ApplicationRecord
  validates_presence_of :title, :message
  validates_associated :home_page_videos, allow_blank: true
  validates_associated :home_page_links, allow_blank: true

  has_many :home_page_videos, dependent: :destroy
  has_many :home_page_links, dependent: :destroy
end
