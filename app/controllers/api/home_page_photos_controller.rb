class Api::HomePagePhotosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_home_page_photo, except: [:index, :create]

  def index
    render json: HomePagePhoto.all
  end

  def query; end

  def show
    render json: @home_page_photo
  end

  def create
    home_page_photo = HomePagePosting.find(params[:home_page_posting_id])
      .home_page_photos.new(home_page_photo_params)
    if home_page_photo.save
      render json: home_page_photo, methods: :photo_url
    else
      render_errors home_page_photo
    end
  end

  def update
    if @home_page_photo.update(home_page_photo_params)
      render json: @home_page_photo, methods: :photo_url
    else
      render_errors @home_page_photo
    end
  end

  def destroy
    @home_page_photo.destroy
  end

  private

  def set_home_page_photo
    @home_page_photo = HomePagePhoto.find(params[:id])
  end

  def home_page_photo_params
    params[:home_page_photo][:base_photo].delete(:file)
    params.require(:home_page_photo)
      .permit(
        :title, :description, :active, :viewable,
        :id, :created_at, :updated_at,
        base_photo: [:name, :base64, :type, :size ],
      )
  end

end
