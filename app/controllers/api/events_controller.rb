class Api::EventsController < ApplicationController
  before_action :set_event, only: %i[show update destroy]

  def index
    events = Event.all
    .where('(start, finish) OVERLAPS (?,?)', params[:start], params[:finish])
    .order(start: :asc)
      # .where('start >= ? AND finish <= ?', params[:start], params[:finish])
    render json: events
  end

  def paginate
    # get the events to display per page
    events = Event
      .where('start >= ? AND finish <= ?', params[:start], params[:finish])
      .order(start: :asc)
      .page(params[:page]).per_page(params[:per])
    # return the events and page information as a json package
    render json: {
      events: events,
      paginate: {
        total_pages: events.total_pages,
        current_page: events.current_page,
        next_page: events.next_page || 0
      }
    }
  end

  def show
    render json: @event
  end

  def update
    if @event.update(event_params)
      render json: @event
    else
      render_error @event
    end
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event
    else
      render_error event
    end
  end

  def destroy
    @event.destroy
  end

  private

  def event_params
    params.require(:event)
      .permit(:start, :finish, :title, :category, :description,
        :created_at, :updated_at, :id )
  end

  def set_event
    @event = Event.find(params[:id])
  end
end
