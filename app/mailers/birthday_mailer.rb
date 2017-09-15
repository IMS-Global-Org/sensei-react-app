class BirthdayMailer < ApplicationMailer
  layout 'mailer'
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.daily.subject
  #
  def daily(mailer_id)
    # acquire the birthdays
    @students = Student
      .find_by_sql(
        'SELECT first, last, birthday, belt, level, ' \
        "date_part('years', age(now() + interval '7 days', birthday)) as current_age, " \
        "date_part('days', age(now() + interval '7 days', birthday)) as days_left " \
        'FROM students ' \
        "WHERE date_part('months', age(now() + interval '7 days', birthday)) = 0 " \
        "AND date_part('days', age(now() + interval '7 days', birthday)) <= 7 " \
      )

      # .where("date_part('days',age(now() + interval '1 day', birthday) <= 1)")
      # .order(birthday: :asc)

    # mail to: mailer.recipient, subject: mailer.subject
    mail to: 'brennick.sci@gmail.com', subject: 'Daily Student Birthday Report'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.weekly.subject
  #
  def weekly(mailer_id)
    mailer = Mailer.find(mailer_id)
    # acquire the birthdays
    @birthdays = Student
      .where("date_part('days',age(now() + interval '1 week', birthday) <= 7)")
      .order(birthday: :asc)

    mail to: mailer.recipient, subject: mailer.subject
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.monthly.subject
  #
  def monthly(mailer_id)
    mailer = Mailer.find(mailer_id)
    # acquire the birthdays
    @birthdays = Student
      .where("date_part('months',age(now() + interval '1 month', birthday) <= 1)")
      .order(birthday: :asc)

    mail to: mailer.recipient, subject: mailer.subject
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.yearly.subject
  #
  def yearly(mailer_id)
    mailer = Mailer.find(mailer_id)
    # acquire the birthdays
    @birthdays = Student
      .where("date_part('years',age(now() + interval '1 year', birthday) <= 1)")
      .order(birthday: :asc)

    mail to: mailer.recipient, subject: mailer.subject
  end
end
