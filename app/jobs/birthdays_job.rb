class BirthdaysJob < ApplicationJob
  queue_as :default

  def perform(*args)
    case birthdays_args[:interval]
    when 'weekly'
      BirthdaysMailer.weekly(args).deliver
    when 'monthly'
      BirthdaysMailer.monthly(args).deliver
    when 'yearly'
      BirthdaysMailer.yearly(args).deliver
    else
      raise 'No Birthday type was passed.'
    end
  end
end
