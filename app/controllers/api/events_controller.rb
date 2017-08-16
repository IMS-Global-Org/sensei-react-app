class Api::EventsController < ApplicationController
  before_action :set_event, only: %i[show update destroy]

  def index
    events = Event.all
      .where('start >= ? AND finish <= ?',params[:start],params[:finish])
      .order(start: :asc)
    render json: events
  end

  def show
  end

  def update
  end

  def create
  end

  def destroy
  end

  private

  def event_params
    params.require(:event)
      .permit(:start, :finish, :title, :category, :description )
  end

  def set_event
    @event = Event.find(params[:id])
  end
end
