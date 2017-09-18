class BirthdayMailer < ApplicationMailer
  include StudentTextTable
  layout 'mailer'
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.daily.subject
  #
  def daily(mailer)
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
    @students_text_table = build_text_table @students unless @students.empty?
    # TODO: Extract recipients e-mail list from the database
    mail to: 'brennick.sci@gmail.com', subject: mailer.subject
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.weekly.subject
  #
  def weekly(mailer)
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
    @students_text_table = build_text_table @students unless @students.empty?
    # TODO: Extract recipients e-mail list from the database
    mail to: 'brennick.sci@gmail.com', subject: mailer[:subject]
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.monthly.subject
  #
  def monthly(mailer)
    @students = Student
      .find_by_sql(
        'SELECT first, last, birthday, belt, level, ' \
        "date_part('years', age(now() + interval '1 month', birthday)) as current_age, " \
        "date_part('days', age(now() + interval '1 month', birthday)) as days_left " \
        'FROM students ' \
        "WHERE date_part('months', age(now() + interval '1 month', birthday)) < 1 " \
        "AND date_part('days', age(now() + interval '1 month', birthday)) <= 31 " \
      )
    @students_text_table = build_text_table @students unless @students.empty?
    # TODO: Extract recipients e-mail list from the database
    mail to: 'brennick.sci@gmail.com', subject: mailer[:subject]
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.birthdays_mailer.yearly.subject
  #
  def yearly(mailer)
    @students = Student
      .find_by_sql(
        'SELECT first, last, birthday, belt, level, ' \
        "date_part('years', age(now() + interval '1 year', birthday)) as current_age, " \
        "date_part('days', age(now() + interval '1 year', birthday)) as days_left " \
        'FROM students ' \
        "WHERE date_part('year', age(now() + interval '1 year', birthday)) >= 1 " \
        "AND date_part('months', age(now() + interval '1 month', birthday)) <= 12 " \
        "AND date_part('days', age(now() + interval '1 month', birthday)) <= 31 " \
      )
    @students_text_table = build_text_table @students unless @students.empty?
    # TODO: Extract recipients e-mail list from the database
    mail to: 'brennick.sci@gmail.com', subject: mailer[:subject]
  end
end
