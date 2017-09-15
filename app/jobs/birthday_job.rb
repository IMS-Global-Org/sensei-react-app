class BirthdayJob < ApplicationJob
  queue_as :default

  def perform(params)
    case params[:interval]
    when 'Daily'
      BirthdayMailer.daily(params[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_day + 1.day))
        .perform_later(params)
    when 'Weekly'
      BirthdayMailer.weekly(params[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_week + 1.week).to_time(:utc))
        .perform_later(params)
    when 'Monthly'
      BirthdayMailer.monthly(params[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_month + 1.month).to_time(:utc))
        .perform_later(params)
    when 'Yearly'
      BirthdayMailer.yearly(params[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_year + 1.year).to_time(:utc))
        .perform_later(params)
    else
      raise 'No Birthday type was passed.'
    end
  end
end
