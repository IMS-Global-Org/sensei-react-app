namespace :contracts do
  desc "Loading database with Test Contractee information"
  task contractee: :environment do
    Contractee.destroy_all

    true_false = [true, false]
    intervals = [6, 12]
    statuses = true_false
    methods = %w[Cash Check Visa Mastercard Discovery MoneyOrder]
    verifieds = true_false
    level = %I[A B C D E F G]
    types = %I[Home Work Mobile Satallite]
    owner_types = %I[Student Parent Relative Gardian]
    active = true_false
    texting = true_false


    50.times do

      contractee = Contractee.create(
        first: Faker::Lorem.word,
        last: Faker::Lorem.word,
        birthdate: Faker::Date.birthday(20, 80),
      )

      2.times do
        contractee.addresses.create(
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

      2.times do
        contractee.emails.create(
          address: Faker::Internet.email,
          type_of: types.sample,
          owner_of: owner_types.sample,
          html: active.sample,
          active: active.sample
        )
      end

      2.times do
        contractee.phones.create(
          phone_number: Faker::PhoneNumber.cell_phone,
          type_of: types.sample,
          owner_of: owner_types.sample,
          texting: texting.sample,
          active: active.sample
        )
      end

      3.times do
        contractee.contracts.create(
          start_date: Faker::Date.between(8.months.ago, Date.today),
          end_date: Faker::Date.between(2.months.ago, 4.months.from_now),
          amount: Faker::Number.between(25, 50),
          interval: intervals.sample,
          status: statuses.sample
        )
        end

        contractee.contracts.all.each do |contract|
          2.times do contract.create(
            charged_date: Faker::Date.between(8.months.ago, 4.months.from_now),
            method: methods.sample,
            amount: Faker::Number.between(25, 50),
            verified: verifieds.sample
          )
        end
      end

    end
  end

end
