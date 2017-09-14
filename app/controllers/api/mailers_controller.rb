class Api::MailersController < ApplicationController
  before_action :set_mailer, only: [:show, :update, :destroy]
  after_action :enqueue_mailers

  def index
    render json: Mailer.all
  end

  def show
    render json: @mailer
  end

  def create
    mailer = Mailer.new(mailer_params)
    if mailer.save
      job = enqueue_type_of mailer
      if mailer.update(job: job.id)
        render json: mailer
      else
        render_errors mailer
      end
    else
      render_errors mailer
    end
  end

  def update
    if @mailer.update(mailer_params)
      dequeue_type_of @mailer
      job = enqueue_type_of @mailer
      if @mailer.update(job: job.id)
        render json: @mailer
      else
        render_errors @mailer
      end
    else
      render_errors @mailer
    end
  end

  def destroy
    dequeue_type_of @mailer
    @mailer.destroy
  end

  private

  def set_mailer
    @mailer = Mailer.find(params[:id])
  end

  def mailer_params
    params.require(:mailer)
      .permit(
        :id, :title, :interval, :type_of, :job,
        :active, :recipients, :subject, :notify
      )
  end

  def enqueue_type_of(mailer)
    # 'NameOfClass'.constantize.new will also work
    case mailer.interval
    when 'Daily'
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: Date.today.at_beggining_of_day + 1.day)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    when 'Weekly'
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: Date.today.at_beggining_of_week + 1.week)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    when 'Monthly'
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: Date.today.at_beggining_of_month + 1.month)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    when 'Yearly'
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: Date.today.at_beggining_of_year + 1.year)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    end
  end

  def dequeue_type_of(mailer)
    selected_mailer = Delayed::Job.find(mailer.id)
    selected_mailer.delete
  end
end
