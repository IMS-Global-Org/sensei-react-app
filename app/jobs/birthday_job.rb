class BirthdayJob < ApplicationJob
  queue_as :default

  def perform(mailer)
    case mailer.interval
    when 'Daily'
      BirthdayMailer.daily(mailer).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_day + 1.day))
        .perform_later(mailer)
    when 'Weekly'
      BirthdayMailer.weekly(mailer).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_week + 1.week).to_time(:utc))
        .perform_later(mailer)
    when 'Monthly'
      BirthdayMailer.monthly(mailer).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_month + 1.month).to_time(:utc))
        .perform_later(mailer)
    when 'Yearly'
      BirthdayMailer.yearly(mailer).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: (Date.today.at_beginning_of_year + 1.year).to_time(:utc))
        .perform_later(mailer)
    else
      raise 'No Birthday type was passed.'
    end
  end
end
