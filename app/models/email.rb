# == Schema Information
#
# Table name: emails
#
#  id         :integer          not null, primary key
#  address    :string           not null
#  type_of    :string           not null
#  owner_of   :string           not null
#  html       :boolean          default(TRUE)
#  active     :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Email < ApplicationRecord
  validates_presence_of :address, :type_of, :owner_of
  validates :html, presence: true, allow_blank: true
  validates :active, presence: true, allow_blank: true

  has_and_belongs_to_many :students
  has_and_belongs_to_many :contractees

end
