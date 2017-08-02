namespace :loader do
  desc "TODO"
  task announcements: :environment do

    # clean up database
    Announcement.destroy_all
    start_date = 1.year.ago
    end_date = Date.today()

    # load some examples
    50.times do
      Announcement.create(
        title: Faker::Lorem.sentence,
        category: Faker::Lorem.words(1)[0],
        message: Faker::Lorem.sentence(1),
        extra: Faker::Lorem.paragraph(1),
        start_date: Faker::Date.between(start_date,end_date),
        end_date: Faker::Date.between(end_date, 1.year.from_now),
        link: Faker::Internet.url,
        cost: Faker::Number.decimal(2),
        registration: Faker::Boolean.boolean
      )
    end
  end

end
