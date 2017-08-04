class HomePageVideo < ApplicationRecord
  validates_presence_of :title, :id, :source
  
  belongs_to :home_page_posting
end
