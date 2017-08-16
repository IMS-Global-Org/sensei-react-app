namespace :loader do
  desc "Load the database with random values for testing reasons"
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

  task postings: :environment do
    HomePagePosting.destroy_all
    # HomePageVideo.destroy_all
    # HomePageLink.destroy_all

    20.times do
      home_page_posting = HomePagePosting.create(
        title: Faker::Lorem.sentence,
        message: Faker::Lorem.paragraph(10)
      )
      3.times do
        HomePageVideo.create(
          title: Faker::Lorem.sentence,
          identifier: Faker::Number.number(2),
          source: Faker::Internet.url,
          notes: Faker::Lorem.paragraph(3),
          home_page_posting: home_page_posting
        )
      end
      3.times do
        HomePageLink.create(
          title: Faker::Lorem.sentence,
          url: Faker::Internet.url,
          abbreviation: Faker::Lorem.characters(2),
          description: Faker::Lorem.paragraph(3),
          home_page_posting: home_page_posting
        )
      end
    end
  end

  task events: :environment do
    # clean up any left in the database
    Event.destroy_all
    # create date limits
    now = Time.now
    start = now - 5.days
    finish = now + 5.days
    # Generic categories
    categories = %w( aerobics weights cardio arms defense offense testing )
    # load the database with lots of random events
    10.times do
      Event.create(
        start: Faker::Time.between(start, now),
        finish: Faker::Time.between(now, finish),
        title: Faker::Lorem.sentence,
        description: Faker::Lorem.paragraph(4),
        category: categories.sample
      )
    end
  end

end
