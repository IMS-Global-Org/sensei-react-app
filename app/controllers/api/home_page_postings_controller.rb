class Api::HomePagePostingsController < ApplicationController
  before_action :set_posting, except: [ :index, :create ]

  # Requires pagination for displaying
  def index
    # Holder for the database sets that are acquired
    json_set = []
    # first acquire the posting set to be displayed
    postings = HomePagePosting
      .includes(:home_page_videos, :home_page_links)
      .order(:created_at)
      .page(params[:page]).per(params[:per])

    # loop over the postings and gather their video and link sets
    postings.each do |posting|
      # acquire the videos
      videos = HomePageVideo.where('home_page_posting_id = ? ', posting.id)
      # acquire the links
      links = HomePageLink.where('home_page_posting_id = ? ', posting.id)
      # insert into the json_set as individual packages
      json_set << { posting: posting, videos: videos, links: links }
    end

    # return all the joined postings as a single json data set
    render json: {
      data: json_set,
      pagination: {
        total_pages: postings.total_pages,
        current_page: postings.current_page,
        next_page: postings.next_page
      }
    }
  end

  def show
    render json: @posting
  end

  def create
    posting = HomePagePosting.new(posting_params)
    if posting.save
      render json: posting
    else
      render_errors(posting)
    end
  end

  def update
    if @posting.update(posting_params)
      render json: @posting
    else
      render_errors(@posting)
    end
  end

  def destroy
    @posting.destroy
  end

  private

  def posting_params
    params
      .required(:home_page_posting)
      .permit(
        :title,
        :message,
        home_page_videos_attributes: [ :title, :identifier, :source ],
        home_page_links_attributes: [ :title, :url, :abbreviation, :description]
      )
  end

  def set_posting
    @posting = HomePagePosting.find(params[:id])
  end
end
