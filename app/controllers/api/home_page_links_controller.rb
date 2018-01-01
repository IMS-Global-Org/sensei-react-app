class Api::HomePageLinksController < ApplicationController
  before_action :set_home_page_link, only: [:show, :update, :destroy]

  def index
    render json: HomePagePosting
      .find(params[:home_page_posting_id]).home_page_links
  end

  def show
    render json: @home_page_link
  end

  def create
    home_page_link = HomePagePosting
      .find(params[:home_page_posting_id])
      .home_page_links
      .build(home_page_link_params)
    if home_page_link.save
      render json: home_page_link
    else
      render_errors home_page_link
    end
  end

  def update
    if @home_page_link.update(home_page_link_params)
      render json: @home_page_link
    else
      render_errors @home_page_link
    end
  end

  def destroy
    @home_page_link.destroy
  end

  private

  def set_home_page_link
    @home_page_link = HomePageLink.find(params[:id])
  end

  def home_page_link_params
    params
      .require(:home_page_link)
      .permit(
        :id, :created_at, :updated_at, :home_page_posting_id,
        :title, :url, :abbreviation, :description
      )
  end
end
