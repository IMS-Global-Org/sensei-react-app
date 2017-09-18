class Api::MailersController < ApplicationController
  before_action :set_mailer, only: [:show, :update, :destroy]

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
      if mailer.update(job: job.job_id)
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
      if @mailer.update(job: job.job_id)
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
      # .set(wait_until: (Date.today.at_beginning_of_day + 1.day))
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: Date.today.at_beginning_of_day + 1.day)
        .perform_later(mailer)
    when 'Weekly'
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: (Date.today.at_beginning_of_week + 1.week).to_time(:utc))
        .perform_later(mailer)
    when 'Monthly'
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: (Date.today.at_beginning_of_month + 1.month).to_time(:utc))
        .perform_later(mailer)
    when 'Yearly'
      return Object::const_get("#{mailer.type_of}Job")
        .set(wait_until: (Date.today.at_beginning_of_year + 1.year).to_time(:utc))
        .perform_later(mailer)
    end
  end

  def dequeue_type_of(mailer)
    return unless mailer.job
    begin
      selected_mailer = Delayed::Job.find(mailer.job)
      selected_mailer.delete if selected_mailer
    rescue ActiveRecord::RecordNotFound
      mailer.update(job: nil)
    end
  end
end
