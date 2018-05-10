class HomePagePhoto < ApplicationRecord
  before_validation :process_base64_photo
  belongs_to :home_page_posting

  attr_accessor :base_photo

  validates_presence_of :title, :active, :viewable
  validates :description, presence: true, allow_blank: true

  has_attached_file :photo,
    styles: {
      large: ['500x500>', :png],
      medium: ['300x300>', :png],
      small: ['100x100>', :png]
      },
    default_url: '/images/:style/missing.png'
  validates_attachment :photo,
    presence: true,
    matches: [/png\z/, /jpe?g\z/],
    content_type: { content_type: /\Aimage\/.*\z/ }

  # Query Helpers
  scope :are_viewable, -> { where(viewable: 1) }
  scope :are_active, -> { where(active: 1) }
  scope :are_publicly_available, -> { where(active: 1).where(viewable: 1) }

  # Model Helper Methods
  def photo_url
    photo.url(:small)
  end

  def process_base64_photo
    photo = Paperclip.io_adapters.for(base_photo[:base64])
    photo.original_filename = base_photo[:name]
    self.photo = photo
  end
end
