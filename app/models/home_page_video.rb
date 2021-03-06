# == Schema Information
#
# Table name: home_page_videos
#
#  id                   :integer          not null, primary key
#  title                :string           not null
#  identifier           :string           not null
#  source               :string           not null
#  notes                :text
#  home_page_posting_id :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class HomePageVideo < ApplicationRecord
  validates_presence_of :title, :identifier, :source
  validates :notes, presence: true, allow_blank: true

  belongs_to :home_page_posting
end
