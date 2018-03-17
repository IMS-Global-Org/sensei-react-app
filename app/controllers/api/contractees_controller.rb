class Api::ContracteesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_contractee, only: [:show, :update, :destroy]

  def index
    authorize! :read, Contract
    render json: Contract.find(params[:contract_id])
      .contractees.all
  end

  def paginate
    authorize! :read, Contractee
    contractees = Contractee
      .where(active: 1)
      .page(params[:page]).per_page(params[:per_page])
    render_paginated_model contractees
  end

  def query
    authorize! :read, Contractee
    render json: Contractee
      .where("last ILIKE '#{params[:query]}%' ")
  end

  def show
    authorize! :read, Contractee
    render json: @contractee
  end

  def show_complete
    authorize! :read, Contractee
    contractee = Contractee
      .includes(:addresses, :phones, :emails)
      .find(params[:contractee_id])
    render json: contractee, include: [:addresses, :phones, :emails]
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
    authorize! :update, Contractee
    if @contractee.update(contractee_params)
      render json: @contractee
    else
      render_errors @contractee
    end
  end

  def destroy
    authorize! :destroy, Contractee
    if @contractee.update(active: 0)
      render json: @contractee
    else
      render_errors @contractee
    end
  end

  private

  def set_contractee
    @contractee = Contractee.find(params[:id])
  end

  def contractee_params
    params.require(:contractee)
      .permit(
        :id, :first, :last, :birthdate,
        :created_at, :updated_at
        # phones_attributes: %I[number type owner text active],
        # emails_attributes: %I[address type owner html active],
        # addresses_attributes: %I[street1 street2 city state zipcode type owner active]
      )
  end
end
