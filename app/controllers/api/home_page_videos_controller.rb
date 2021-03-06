class Api::HomePageVideosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_video, only: [:show, :update, :destroy]

  def index
    authorize! :read, HomePageVideo
    videos = HomePagePosting.find(params[:home_page_posting_id])
      .videos.all
    render json: videos
  end

  def show
    authorize! :read, HomePageVideo
    render json: @video
  end

  def create
    authorize! :create, HomePageVideo
    video = HomePagePosting
      .find(params[:home_page_posting_id])
      .home_page_videos
      .build(video_params)
    if video.save
      render json: video
    else
      render_errors video
    end
  end

  def update
    authorize! :update, HomePageVideo
    if @video.update(video_params)
      render json: @video
    else
      render_errors @video
    end
  end

  def destroy
    authorize! :destroy, HomePageVideo
    @video.destroy
  end

  private

  def set_video
    @video = HomePageVideo.find(params[:id])
  end

  def video_params
    params
      .require(:home_page_video)
      .permit(
        :id, :title, :identifier, :source, :notes,
        :created_at, :updated_at
      )
  end
end
