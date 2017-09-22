class Api::ContracteesController < ApplicationController
  before_action :set_contractee, only: [:show, :update, :destroy]

  def index
    render json: Contractee.all.page(params[:page]).per_page(params[:per])
  end

  def show
    render json: @contractee
  end

  def create
    contractee = Contractee.new(contractee_params)
    if contractee.save
      render json: contractee
    else
      render_errors contractee
    end
  end

  def update
    if @contractee.update(contractee_params)
      render json: @contractee
    else
      render_errors @contractee
    end
  end

  def destroy
    @contractee.destroy
  end

  private

  def set_contractee
    @contractee = Contractee.find(params[:id])
  end

  def contractee_params
    params.require(:contractee)
      .permit(
        :id, :first, :last, :birthdate,
        phones_attributes: %I[number type owner text active],
        emails_attributes: %I[address type owner html active],
        addresses_attributes: %I[street1 street2 city state zipcode type owner active]
      )
  end
end
