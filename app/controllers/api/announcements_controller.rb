class Api::AnnouncementsController < ApplicationController
  # allow all the sites visitors to see the announcements
  skip_before_action :authenticate_user!, raise: false, only: [ :index, :show ]
  # Set the announcement to be altered before running
  before_action :set_announcement, only: [ :update, :destroy ]
  before_action :set_dates, except: [ :destroy, :update, :create ]

  # Returns a paginated set of announcements. Ordered newest to oldest
  def index
    # query and return ordered by newest event
    ancts = Announcement
      .where('start_date >= ? AND end_date < ?',@start_date,@end_date)
      .order(:start_date)
      .page(params[:page]).per_page(params[:per])
    # render json object with new set of announcements and pagination info
    render json: {
      data: ancts,
      pagination: {
        total_pages: ancts.total_pages,
        current_page: ancts.current_page,
        next_page: ancts.next_page,
        # prev_page: ancts.prev_page 
      }
    }
  end

  # Return a single announcement record for viewing
  def show
    render json: @announcement
  end

  # Create a new announcement record in the database, based on the information
  # obtained from the client/user
  def create
    announcement = Announcement.new(announcement_params)
    if announcement.save
      render json: announcement
    else
      render_errors announcement
    end
  end

  # Updates the information for an existing announcement record
  def update
    if @announcement.update(announcement_params)
      render json: @announcement
    else
      render_errors @announcement
    end
  end

  # perminately removes a single announcement record
  def destroy
    @annoucement.destroy
  end

  private

  def set_announcement
    @announcement = Announcement.find(params[:id])
  end

  def announcement_params
    params.required(:announcement).permit(
      :title, :category, :message, :extra,
      :start_date, :end_date, :link, :cost, :registration
    )
  end

  # Set the time period for retrieving announcements
  def set_dates
    # Both dates are provided
    if params[:start_date] && params[:end_date]
      @start_date = params[:start_date] if params[:start_date]
      @end_date = params[:end_date] if params[:end_date]

    # only a starting date has been provided
    elsif params[:start_date] && !params[:end_date]
      @start_date = params[:start_date] if params[:start_date]
      @end_date = Time.new.utc + 1.day

    # No dates were submitted
    else
      @start_date = 2.weeks.ago
      @end_date = 1.week.from_now
    end
  end
end
