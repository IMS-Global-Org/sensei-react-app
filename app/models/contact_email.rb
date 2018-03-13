# == Schema Information
#
# Table name: contact_emails
#
#  id             :integer          not null, primary key
#  first_name     :string           not null
#  last_name      :string           not null
#  address        :string           not null
#  subject        :string           not null
#  body           :text             not null
#  phone          :string
#  correspondance :integer          default(0)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class ContactEmail < ApplicationRecord
  validates_presence_of :first_name, :last_name, :address, :subject, :body
  validates :correspondance, presence: true, inclusion: { in: [0,1] }
  validates :phone, presence: true, allow_blank: true
    # format: {
    #   with: /\A\(\d{3}\)\s\d{3}\s-\s\d{4}\z/,
    #   message: 'Incorrect Telephone Number Format!'
    # }
end
