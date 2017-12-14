namespace :loader do |loader_namespace|
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
        registration: [1,0].sample
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

  task programs: :environment do
    # destroy all existing programs and associated requirements
    Program.destroy_all
    # generate levels
    program_levels = (1..20).to_a
    # create the requirements

    # create the parent programs with requirements attributes
    20.times do
      program = Program.create(
        title: Faker::Lorem.sentence,
        description: Faker::Lorem.paragraph(5),
        level: program_levels.shift
      )
      requirement_levels = (1..10).to_a
      10.times do
        Requirement.create(
          title: Faker::Lorem.sentence,
          description: Faker::Lorem.paragraph(3),
          level: requirement_levels.shift,
          program_id: program.id
        )
      end
    end
  end

  task students: :environment do
    # Remore any pre-existing student information in the database
    Student.destroy_all
    # Default value helpers
    gender = %I[male female]
    level = %I[A B C D E F G]
    types = %I[Home Work Mobile Satallite]
    owner_types = %I[Student Parent Relative Gardian]
    belt = %I[black green yellow red purple]
    active = %I[true false]
    texting = %I[true false]

    50.times do
      student = Student.create(
        first: Faker::Name.first_name,
        last: Faker::Name.last_name,
        birthday: Faker::Date.birthday(12,50),
        gender: gender.sample,
        photo: Faker::LoremPixel.image("50x60"),
        belt: belt.sample,
        level: Faker::Number.between(1,20).to_s + level.sample.to_s
      )
      3.times do
        student.phones.create(
          phone_number: Faker::PhoneNumber.cell_phone,
          type_of: types.sample,
          owner_of: owner_types.sample,
          texting: texting.sample,
          active: active.sample
        )
      end
      2.times do
        student.emails.create(
          address: Faker::Internet.email,
          type_of: types.sample,
          owner_of: owner_types.sample,
          html: active.sample,
          active: active.sample
        )
      end
      2.times do
        student.addresses.create(
          street1: Faker::Address.street_address,
          street2: Faker::Address.secondary_address,
          city: Faker::Address.city,
          state: Faker::Address.state,
          zipcode: Faker::Address.zip_code,
          type_of: types.sample,
          owner_of: owner_types.sample,
          active: active.sample
        )
      end
    end
  end

  task mailers: :environment do
    Mailer.destroy_all

    intervals = %w[Daily Weekly Monthly Yearly]
    types = %w[Birthday Billing Activity]
    recipients = %w[Admin User Guest]

    20.times do
      mailer = Mailer.create(
        title: Faker::Lorem.sentence,
        interval: intervals.sample,
        type_of: types.sample,
        active: [true, false].sample,
        recipients: recipients.sample,
        subject: Faker::Lorem.sentence,
        notify: [true, false].sample
      )
    end
  end

  task :all do
    loader_namespace.tasks.each do |task|
      Rake::Task[task].invoke
    end
  end
end
