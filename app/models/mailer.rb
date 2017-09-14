# == Schema Information
#
# Table name: mailers
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  interval   :integer          not null
#  type_of    :string           not null
#  active     :boolean          default(TRUE), not null
#  recipients :string           not null
#  subject    :string
#  notify     :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Mailer < ApplicationRecord
  validates_presence_of :title, :type_of
  validates :interval, inclusion: { in: %w[Daily Weekly Monthly Yearly] }
  validates :active, inclusion: { in: [true, false] }
  validates :recipients, inclusion: { in: %w[Admin User Guest] }
  validates :subject, presence: true, allow_blank: true
  validates :notify, inclusion: { in: [true, false] }
end
