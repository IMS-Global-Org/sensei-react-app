class HomePagePosting < ApplicationRecord
  validates_presence_of :title, :message
  validates_associated :home_page_videos, allow_blank: true
  validates_associated :home_page_links, allow_blank: true

  has_many :home_page_videos, :home_page_links
end
