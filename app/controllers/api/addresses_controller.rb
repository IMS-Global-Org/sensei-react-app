class Api::AddressesController < ApplicationController
  before_action :set_address, only: %I[show update destroy]

  def index
    addresses = Address.all
      .where('student_id == ?', params[:student_id])
      .order(type_of: :asc)

    render json: addresses
  end

  def show
    render json: @address
  end

  def update
    if @address.update(address_params)
      render json: @address
    else
      render_errors @address
    end
  end

  def create
    address = Address.new(address_params)
    if address.save
      render json: address
    else
      render_errors address
    end
  end

  def destroy
    @address.destroy
  end

  private

  def set_address
    @address = Address.find(params[:id])
  end

  def address_params
    params
      .require(:address)
      .permit(
        :id, :street1, :street2, :city, :state,
        :zipcode, :type_of, :owner_of
      )
  end
end