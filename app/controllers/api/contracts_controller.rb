class Api::ContractsController < ApplicationController
  before_action :set_contract, only: [:show, :update, :destroy]

  def index
    render json: Contract.all.page(params[:page]).per_page(params[:per])
  end

  def show
    render json: @contract
  end

  def create
    contract = Contract.new(contract_params)
    if contract.save
      render json: contract
    else
      render_errors contract
    end
  end

  def update
    if @contract.update(contract_params)
      render json: @contract
    else
      render_errors @contract
    end
  end

  def destroy
    @contract.destroy
  end

  private

  def set_contract
    @contract = Contract.find(params[:id])
  end

  def contract_params
    params.require(:contract)
      .permit(
        :id, :start_date, :end_date, :amount, :interval, :status,
        payments_attributes: %I[charged_date method amount verified]
      )
  end
end
