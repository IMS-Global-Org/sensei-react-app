class Api::RequirementsController < ApplicationController
  before_action :set_requirement, except: %I[index create]

  def index
    requirements = Requirement.all
      .where('program_id = ?', params[:prog_id])
      .order(level: :asc)
      .page(params[:page]).per_page(params[:per_page])
    render json: {
      data: requirements,
      pagination: {
        total_pages: requirements.total_pages,
        current_page: requirements.current_page,
        next_page: requirements.next_page || 0
      }
    }
  end

  def show
    render json: @requirement
  end

  def update
    if @requirement.update(requirement_params)
      render json: @requirements
    else
      render_errors @requirements
    end
  end

  def create
    requirement = Requirement.new(requirement_params)
    if requirement.save
      render json: requirement
    else
      render_errors requirement
    end
  end

  def destroy
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
