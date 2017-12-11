class Api::BirthdaysMailerController < ApplicationController
  before_action :authenticate_user!

  def index
    BirthdaysJob.set(wait_until: Date.tomorrow.morning).perform_later({
      interval: 'daily'
    })
    flash[:success] = 'Birthdays Mailer queued!'
    render json: { status: 'Good!' }
  end

  def daily; end

  def weekly; end

  def monthly; end

end
