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
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      links = HomePageLink
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
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
    if @posting.update(posting_params)
      videos = HomePageVideo
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      links = HomePageLink
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      render json: {
        id: @posting.id,
        title: @posting.title,
        # message: @posting.message,
        videos: videos.count,
        links: links.count,
        created_at: @posting.created_at
      }
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
      .permit(:id, :title, :message, :created_at, :updated_at,
        home_page_videos_attributes:
          [ :id, :title, :identifier, :source,
            :notes, :home_page_posting_id, :_destroy ],
        home_page_links_attributes:
          [ :id, :title, :url, :abbreviation,
            :description, :home_page_posting_id, :_destroy ]
      )
  end
end
