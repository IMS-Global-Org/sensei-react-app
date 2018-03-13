namespace :contact_emails do
  desc "Create a list of Test E-mail Messages"
  task emails: :environment do
    ContactEmail.destroy_all

    # NOTE: You must first comment out the validator pattern check in the
    #   ContactUs model for the phone number.
    30.times do
      ContactEmail.create(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        phone: Faker::PhoneNumber.phone_number,
        address: Faker::Internet.email,
        subject: Faker::Lorem.sentence,
        body: Faker::Lorem.paragraph(5)
      )
    end
  end

end
