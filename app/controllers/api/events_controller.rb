class Api::EventsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_event, only: %i[show update destroy]

  def index
    authorize! :read, Event
    events = Event.all
      .where('(start, finish) OVERLAPS (?,?)', params[:start], params[:finish])
      .order(start: :asc)
    render json: events.as_json( include: {
      weekday: {
        except: [:event_id, :created_at, :updated_at] }
      }
    )
  end

  def paginate
    authorize! :read, Event
    # get the events to display per page
    events = Event.all
      .where('start >= ? AND finish <= ?', params[:start], params[:finish])
      .order(start: :asc)
      .page(params[:page]).per_page(params[:per])
    # return the events and page information as a json package
    # json_events = events.as_json( include: :weekday )

    render json: {
      paginate: {
        total_pages: events.total_pages,
        current_page: events.current_page,
        next_page: events.next_page || 0
      },
      events: events
    }
  end

  def show
    authorize! :read, Event
    render json: @event.as_json( include: {
      weekday: {
        except: [:event_id, :created_at, :updated_at] }
      }
    )
  end

  def update
    authorize! :update, Event
    if @event.update(event_params)
      render json: @event.as_json( include: {
        weekday: {
          except: [:event_id, :created_at, :updated_at] }
        }
      )
    else
      render_error @event
    end
  end

  def create
    authorize! :create, Event
    event = Event.new(event_params)
    if event.save
      render json: event.as_json( include: {
        weekday: {
          except: [:event_id, :created_at, :updated_at] }
        }
      )
    else
      render_error event
    end
  end

  def destroy
    authorize! :destroy, Event
    @event.destroy
  end

  private

  def event_params
    params.require(:event)
      .permit(:start, :finish, :title, :category, :description,
        :created_at, :updated_at, :id,
        weekday_attributes: [:Sun, :Mon, :Tue, :Wed, :Thu, :Fri, :Sat, :id]
      )
  end

  def set_event
    @event = Event.find(params[:id])
  end
end
