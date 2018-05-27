class Api::ContractsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_contract, only: [:update, :destroy]

  def index
    authorize! :read, Contract
    contracts = Contract
      .includes(:contractees)
      .order(created_at: :desc, updated_at: :desc)
      .page(params[:page]).per_page(params[:per])

    pagination = {
      total_pages: contracts.total_pages,
      current_page: contracts.current_page,
      next_page: contracts.next_page
    }

    contracts_data = {}
    contracts_data['pagination'] = pagination
    contracts_data['data'] = contracts.as_json(
      include: {
        contractees: {
          only: [:id, :first, :last]
        }
      }
    )

    render json: contracts_data # calls to_json automatically
  end

  def query
    authorize! :read, Contract
    p = params[:query]

    interval = p[:interval].blank? ? '6,12' : p[:interval].to_i
    status = p[:status].blank? ? '1,0' : p[:status].to_i
    start_date = p[:start_date].blank? ? 2.years.ago : p[:start_date]
    end_date = p[:end_date].blank? ? DateTime.current() : p[:end_date]

    contracts = Contract
      .joins(
        '  LEFT JOIN contractees_contracts ON contractees_contracts.contract_id = contracts.id ' \
        '  LEFT JOIN contractees ON contractees.id = contractees_contracts.contractee_id ' \
      )
      .includes(:contractees)
      .where(
        " contractees.first LIKE '#{p[:first]}%'" \
        " AND contractees.last LIKE '#{p[:last]}%'" \
        " AND contracts.interval IN(#{interval})" \
        " AND contracts.status IN(#{status})" \
        " AND contracts.start_date > '#{start_date}'" \
        " AND contracts.end_date < '#{end_date}'"
      )
      .group('contracts.id')
      .order(created_at: :desc, updated_at: :desc)
      .page(params[:page]).per_page(params[:per])

    contracts_data = {}
    contracts_data[:pagination] = {
      total_pages: contracts.total_pages,
      current_page: contracts.current_page,
      next_page: contracts.next_page
    }
    contracts_data[:data] = contracts.as_json(
      include: {
        contractees: {
          only: [:id, :first, :last]
        }
      }
    )
    render json: contracts_data
  end

  def show
    authorize! :read, Contract
    render json: @contract
  end

  def details
    authorize! :read, Contract
    contract = Contract
      .select(
        'contracts.*, json_agg(contractees.*) as holders '
      )
      .joins(
        'LEFT JOIN contractees_contracts ON contractees_contracts.contract_id = contracts.id ' \
        'LEFT JOIN contractees ON contractees.id = contractees_contracts.contractee_id '
      )
      .where(
        "contracts.id = #{params[:id]}"
      )
      .group(
        'contracts.id'
      )

    render json: contract[0]
  end

  def create
    authorize! :create, Contract
    contract = Contract.new(contract_params)
    if contract.save
      render json: contract
    else
      render_errors contract
    end
  end

  def update
    authorize! :update, Contract
    if @contract.update(contract_params)
      render json: @contract
    else
      render_errors @contract
    end
  end

  def destroy
    authorize! :destroy, Contract
    if @contract.update(archived: 1)
      render json: @contract
    else
      render_errors @contract
    end
  end

  def archived
    authorize! :read, Contract
    archived = Contract
      .where(archived: 1)
      .order(created_at: :desc, updated_at: :desc)
      .page(params[:page]).per_page(params[:per])
    render json: {
      data: archived,
      pagination: {
        total_pages: archived.total_pages,
        current_page: archived.current_page,
        next_page: archived.next_page
      }
    }
  end

  def add_contractee
    authorize! :read, Contract
    contract = Contract.find(params[:id])
    params[:contractees].split(',').each do |id|
      contract.contractees << Contractee.find(id)
    end
    render json: contract.contractees.all
    # Contract.find(params[:id]).contractees << Contractee.find(params[:contractees])
  end

  def delete_contractee
    authorize! :destroy, Contractee
    Contract.find(params[:id]).contractees.delete(Contractee.find(params[:contractee]))
  end

  private

  def set_contract
    @contract = Contract.find(params[:id])
  end

  def contract_params
    params.require(:contract)
      .permit(
        :id, :start_date, :end_date, :amount, :interval, :status,
        :archived, :created_at, :updated_at,
        # payments_attributes: %I[id charged_date method amount verified],
        # contractees_attributes: %I[id first last birthdate]
      )
  end
end
