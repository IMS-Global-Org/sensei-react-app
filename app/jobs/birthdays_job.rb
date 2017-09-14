class BirthdaysJob < ApplicationJob
  queue_as :default

  def perform(*args)
    case args[:interval]
    when 'weekly'
      BirthdaysMailer.weekly(some_args).deliver
    when 'monthly'
      BirthdaysMailer.monthly(some_args).deliver
    when 'yearly'
      BirthdaysMailer.yearly(some_args).deliver
    else
      raise 'No Birthday type was passed.'
    end
  end
end
