class Mailer < ApplicationRecord
  validates :title, presence: true, allow_blank: false
  validates :interval, presence: true, inclusion: { in: %I[Daily Weekly Monthly Yearly] }
  validates :type_of, presence: true, allow_blank: false
  validates :active, presence: true, inclusion: { in: [true, false] }
  validates :recipients, presence: true, inclusion: { in: %w[Admin Users Guest] }
  validates :subject, presence: true, allow_blank: true
  validates :notify, presence: true, inclusion: { in: [true, false] }
end
