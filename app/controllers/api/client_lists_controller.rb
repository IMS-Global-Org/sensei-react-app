class Api::ClientListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_client, only: [:update]

  def index
    authorize! :read, User
    render_paginated_model User.all
      .where("permissions NOT ILIKE '%super%'")
      .page(params[:page]).per_page(params[:per_page])
  end

  def update
    authorize! :update, User
    if @client.update(client_params)
      render json: @client
    else
      render_errors @client
    end
  end

  def query
    authorize! :read, User
    render json: User.all
      .where("permissions NOT ILIKE '%super%'")
      .where("name ILIKE '%#{params[:name]}%'")
      .where("email ILIKE '%#{params[:email]}%'")
  end

  private

  def set_client
    @client = User.find(params[:id])
  end

  def client_params
    params.permit(:permissions, :name, :email)
  end

end
