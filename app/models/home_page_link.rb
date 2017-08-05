# == Schema Information
#
# Table name: home_page_links
#
#  id                   :integer          not null, primary key
#  title                :string           not null
#  url                  :string           not null
#  abbreviation         :string           not null
#  home_page_posting_id :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class HomePageLink < ApplicationRecord
  validates_presence_of :title, :url, :abbreviation
  
  belongs_to :home_page_posting
end
