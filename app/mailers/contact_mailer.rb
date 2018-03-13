class ContactMailer < ApplicationMailer

  def contact_email(params)
    @params = params
    @blkcv_url = 'http://www.blkcv.com/'
    mail(to: params[:address], subject: params[:subject])
  end

end
