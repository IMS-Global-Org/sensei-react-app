class Api::EmailsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_email, only: %I[show update destroy]

  def index
    authorize! :read, Email
    emails = Email
      .where('student_id == ?', params[:student_id])
      .order(type_of: :asc)

    render json: emails
  end

  def show
    authorize! :read, Email
    render json: @email
  end

  def update
    authorize! :update, Email
    if @email.update(email_params)
      render json: @email
    else
      render_errors @email
    end
  end

  def create
    authorize! :create, Email
    email = Contractee.find(params[:contractee_id])
      .emails.build(email_params)
    if email.save
      render json: email
    else
      render_errors email
    end
  end

  def destroy
    authorize! :destroy, Email
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
