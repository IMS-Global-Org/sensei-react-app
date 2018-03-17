class Api::BirthdaysMailerController < ApplicationController
  before_action :authenticate_user!

  def index
    if User.find(current_user.id).has_permission?(:admin)
      BirthdaysJob.set(wait_until: Date.tomorrow.morning).perform_later({
        interval: 'daily'
      })
      flash[:success] = 'Birthdays Mailer queued!'
      render json: { status: 'Good!' }
    else
      flash[:error] = 'Birthdays Mailer Not Queued!'
      render json: { status: 'Bad!' }
    end
  end

  def daily; end

  def weekly; end

  def monthly; end

end
