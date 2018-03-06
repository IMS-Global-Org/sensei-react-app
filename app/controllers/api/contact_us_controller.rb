class Api::ContactUsController < ApplicationController
  skip_before_action :authenticate_user!, raise: false, only: [ :create ]
  before_action :set_contact_us, only: [ :show, :update, :delete ]

  def index
    render json: ContactUs.all.page(params[:page]).per_page(params[:per_page])
  end

  def show
    render json: @contact_us
  end

  def create
    contact_us = ContactUs.new(contact_us_params)
    if contact_us.save
      render json: contact_us
    else
      render_errors contact_us
    end
  end

  def update
    if @contact_us.update(contact_us_params)
      render json: @contact_us
    else
      render_errors @contact_us
    end
  end

  def delete
    @contact_us.destroy
  end

  private

  def set_contact_us
    @contact_us = ContactUs.find(params[:id])
  end

  def contact_us_params
    @params.require(:contact_us)
      .permit(
        :first_name, :last_name, :address, :subject, :body, :phone
      )
  end

end
