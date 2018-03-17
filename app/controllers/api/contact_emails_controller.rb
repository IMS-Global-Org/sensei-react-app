class Api::ContactEmailsController < ApplicationController
  skip_before_action :authenticate_user!, raise: false, only: [ :create ]
  before_action :set_contact_email, only: [ :show, :update, :delete ]

  def index
    authorize! :read, ContactEmail
    emails = ContactEmail.all
      .order(created_at: :asc)
      .page(params[:page]).per_page(params[:per_page])
    render_paginated_model emails
  end

  def query; end

  def show
    authorize! :read, @contact_email
    render json: @contact_email
  end

  def create
    contact_email = ContactEmail.new(contact_email_params)
    if contact_email.save
      ContactMailer.contact_email(contact_email_params).deliver_now
      render json: contact_email
    else
      render_errors contact_email
    end
  end

  def update
    authorize! :update, @contact_email
    if @contact_email.update(contact_email_params)
      render json: @contact_email
    else
      render_errors @contact_email
    end
  end

  def delete
    authorize! :destroy, @contact_email
    @contact_email.destroy
  end

  private

  def set_contact_email
    @contact_email = ContactEmail.find(params[:id])
  end

  def contact_email_params
    params.require(:contact_email)
      .permit(
        :first_name, :last_name, :address,
        :subject, :body, :phone, :correspondance,
      )
  end

end
