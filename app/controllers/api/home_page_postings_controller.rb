class Api::HomePagePostingsController < ApplicationController
  before_action :set_posting, except: [ :index, :create ]

  # Requires pagination for displaying
  def index
    postings = HomePagePosting
      .joins(:home_page_videos,:home_page_links)
      .order(:created_at)
      .page(params[:page]).per(params[:per])
    render json: {
      data: postings,
      pagination: {
        total_pages: postings.total_pages,
        current_page: postings.current_page,
        next_page: postings.next_page,
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
    params.required(:home_page_posting).permit(:title, :message)
  end

  def set_posting
    @posting = HomePagePosting.find(params[:id])
  end
end
