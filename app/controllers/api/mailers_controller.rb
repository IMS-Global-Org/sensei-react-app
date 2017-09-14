class Api::MailersController < ApplicationController
  before_action :set_mailer, only: [:show, :update, :destroy]

  def index
    render json: Mailer.all
  end

  def show
    render json: @mailer
  end

  def create
    mailer = Mailer.new(mailer_params)
    if mailer.save
      render json: mailer
    else
      render_errors mailer
    end
  end

  def update
    if @mailer.update(mailer_params)
      render json: @mailer
    else
      render_error @mailer
    end
  end

  def destroy
    @mailer.destroy
  end

  private

  def set_mailer
    @mailer = Mailer.find(params[:id])
  end

  def mailer_params
    params.require(:mailer)
      .permit(
        :id, :title, :interval, :type_of,
        :active, :recipients, :subject, :notify
      )
  end
end
