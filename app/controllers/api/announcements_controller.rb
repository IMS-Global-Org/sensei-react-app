class Api::AnnouncementsController < ApplicationController
  # allow all the sites visitors to see the announcements
  skip_before_action :authenticate_user!, raise: false

  # Returns a paginated set of announcements. Ordered newest to oldest
  def index
    # Set the time period for retrieving announcements
    startDate = Time.new.utc + 2.weeks
    endDate = Time.new.utc - 1.day
    # query and return ordered by newest event
    ancts = Announcement
      .where('start_date <= ? AND end_date > ?',startDate,endDate)
      .order(:start_date)
      .page(params[:page]).per(params[:per])
    # render json object with new set of announcements and pagination info
    render json: {
      data: ancts,
      pagination: {
        total_pages: ancts.total_pages,
        current_page: ancts.current_page,
        next_page: ancts.next_page,
        prev_page: ancts.prev_page
      }
    }
  end

  def show
  end

  def create
  end

  def update
  end

  def edit
  end

  def destroy
  end
end
