class BirthdayJob < ApplicationJob
  queue_as :default

  def perform(*args)
    case args[:interval]
    when 'Daily'
      BirthdayMailer.weekly(args[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: Date.today.at_beggining_of_day + 1.day)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    when 'Weekly'
      BirthdayMailer.monthly(args[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: Date.today.at_beggining_of_week + 1.week)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    when 'Monthly'
      BirthdayMailer.monthly(args[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: Date.today.at_beggining_of_month + 1.month)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    when 'Yearly'
      BirthdayMailer.yearly(args[:mailer_id]).deliver
      # reset the job
      BirthdayJob
        .set(wait_until: Date.today.at_beggining_of_year + 1.year)
        .perform_later(interval: mailer.interval, mailer_id: mailer.id)
    else
      raise 'No Birthday type was passed.'
    end
  end
end
