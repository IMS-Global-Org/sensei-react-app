class Api::EmailsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_email, only: %I[show update destroy]

  def index
    emails = Email
      .where('student_id == ?', params[:student_id])
      .order(type_of: :asc)

    render json: emails
  end

  def show
    render json: @email
  end

  def update
    if @email.update(email_params)
      render json: @email
    else
      render_errors @email
    end
  end

  def create
    email = Contractee.find(params[:contractee_id])
      .emails.build(email_params)
    if email.save
      render json: email
    else
      render_errors email
    end
  end

  def destroy
    @email.destroy
  end

  private

  def set_email
    @email = Email.find(params[:id])
  end

  def email_params
    params
      .require(:email)
      .permit(
        :id, :address, :type_of, :owner_of, :html, :active,
        :created_at, :updated_at,
      )
  end
end
