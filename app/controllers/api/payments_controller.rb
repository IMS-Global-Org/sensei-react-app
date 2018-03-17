class Api::PaymentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payment, only: [:show, :update, :destroy]

  def index
    authorize! :read, Payment
    render json: Payment.all.page(params[:page]).per_page(params[:per])
  end

  def show
    authorize! :read, Payment
    render json: @payment
  end

  def create
    authorize! :create, Payment
    payment = Payment.new(payment_params)
    if payment.save
      render json: payment
    else
      render_errors payment
    end
  end

  def update
    authorize! :update, Payment
    if @payment.update(payment_params)
      render json: @payment
    else
      render_errors @payment
    end
  end

  def destroy
    authorize! :destroy, Payment
    @payment.destroy
  end

  private

  def set_payment
    @payment = Payment.find(params[:id])
  end

  def payment_params
    params.require(:payment)
      .permit(
        :id, :charged_date, :method, :amount, :verified
      )
  end
end
