namespace :loader do
  desc "TODO"
  task announcements: :environment do

    # clean up database
    Announcement.destroy_all

    # set working dates
    start_date = 1.week.ago
    end_date = 1.week.from_now

    # load some examples
    50.times do
      Announcement.create(
        title: Faker::Lorem.sentence,
        category: Faker::Lorem.words(1)[0],
        message: Faker::Lorem.sentence(1),
        extra: Faker::Lorem.paragraph(1),
        start_date: Faker::Date.between(start_date, Time.new.utc),
        end_date: Faker::Date.between(Time.new.utc, end_date),
        link: Faker::Internet.url,
        cost: Faker::Number.decimal(2),
        registration: Faker::Boolean.boolean
      )
    end
  end

end
