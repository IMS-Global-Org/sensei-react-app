class HomePageLink < ApplicationRecord
  validates_presence_of :title, :url, :abbreviation
  
  belongs_to :home_page_posting
end
