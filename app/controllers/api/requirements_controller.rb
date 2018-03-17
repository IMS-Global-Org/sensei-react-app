class Api::RequirementsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_requirement, except: %I[index create]

  def index
    authorize! :read, Requirement
    requirements = Requirement
      .where('program_id = ?', params[:prog_id])
      .order(level: :asc)
      .page(params[:page]).per_page(params[:per_page])

    render_paginated_model requirements
  end

  def show
    authorize! :read, Requirement
    render json: @requirement
  end

  def update
    authorize! :update, Requirement
    if @requirement.update(requirement_params)
      render json: @requirement
    else
      render_errors @requirement
    end
  end

  def create
    authorize! :create, Requirement
    requirement = Requirement.new(requirement_params)
    if requirement.save
      render json: requirement
    else
      render_errors requirement
    end
  end

  def destroy
    authorize! :destroy, Requirement
    @requirement.destroy
  end

  private

  def set_requirement
    @requirement = Requirement.find( params[:id] )
  end

  def requirement_params
    params.require(:requirement)
      .permit(:id, :title, :level, :description, :program_id)
  end
end
