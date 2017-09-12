class Api::BirthdaysMailerController < ApplicationController

  def create
    binding.pry
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
