class ApplicationMailer < ActionMailer::Base
  # website specific email address: blkcvkarate@gmail.com
  default from: 'brennick.sci@gmail.com'
  layout 'mailer'
end
