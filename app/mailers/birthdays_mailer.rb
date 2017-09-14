class BirthdaysMailer < ApplicationMailer
  default :from, 'sensei-react-app@blkdojos_unit.com'
  before_action :set_email_recipient

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.daily.subject
  #
  def daily(some_args)
    @greeting = "Hi"

    mail to: @recipient, subject: 'Daily Birthdays'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.weekly.subject
  #
  def weekly(some_args)
    @greeting = "Hi"

    mail to: @recipient, subject: 'Weekly Birthdays'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.monthly.subject
  #
  def monthly(some_args)
    @greeting = "Hi"

    mail to: @recipient, subject: 'Monthly Birthdays'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.yearly.subject
  #
  def yearly(some_args)
    @greeting = "Hi"

    mail to: @recipient, subject: 'Yearly Birthdays'
  end

  private

  def set_email_recipient
    @recipient = 'brennick.sci@gmail.com'
  end
end
