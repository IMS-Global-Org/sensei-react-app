class ContactUs < ApplicationRecord
  validates_presence_of :first_name, :last_name, :address, :subject, :body
  validates :phone, presence: true, allow_blank: true,
    format: {
      with: /^\(\d{3}\)\s\d{3}\s-\s\d{4}$/,
      message: 'Incorrect Telephone Number Format!'
    }
end
