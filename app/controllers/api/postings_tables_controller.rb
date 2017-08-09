class Api::PostingsTablesController < ApplicationController
  before_action :set_posting, except: [ :index, :create ]

  def index
    # query the database while making the necessary adjustments to format
    postings = HomePagePosting
      .select(
        'home_page_postings.id, ' \
        'home_page_postings.title, ' \
        'count(distinct home_page_videos.*) as videos, ' \
        'count(distinct home_page_links.*) as links, ' \
        'home_page_postings.created_at ')
      .joins(:home_page_videos, :home_page_links)
      .group(
        'home_page_postings.id',
        'home_page_postings.title',
        'home_page_postings.created_at')
      .page(params[:page]).per(params[:per])

    # return a complete json object with pagination
    render json: {
      data: postings,
      pagination: {
        total_pages: postings.total_pages,
        current_page: postings.current_page,
        next_page: postings.next_page
      }
    }
  end

  def show
    if @posting
      videos = HomePageVideo
        .all.where('home_page_posting_id = ?', @posting.id)
      links = HomePageLink
        .all.where('home_page_posting_id = ?', @posting.id)
      render json: {
        id: @posting.id,
        title: @posting.title,
        message: @posting.message,
        videos: videos,
        links: links
      }
    else
      render_error @posting
    end
  end

  def create
    posting = HomePagePosting.new(posting_params)
    if posting.save
      render json: posting
    else
      render_error posting
    end
  end

  def update
    if @posting.update
      render json: @posting
    else
      render_error @posting
    end
  end

  def destroy
    @posting.destroy
  end

  private

  def set_posting
    @posting = HomePagePosting.find(params[:id])
  end

  def posting_params
    params.require(:home_page_posting)
      .permit(:title, :message,
        home_page_video_attributes: [:title, :identifier, :source, :notes],
        home_page_links_attributes: [:title, :url, :abbreviation, :description]
      )
  end
end
