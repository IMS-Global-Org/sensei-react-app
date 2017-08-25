# Programs provided by the martial arts studio
# @author Brennick Langston
# @version 0.0.1
class Api::ProgramsController < ApplicationController
  before_action :set_program, except: %I[index create]

  # Returns a page of programs
  def index
    programs = Program
      .paginate_by_sql(
        'SELECT p.id, p.title, p.description, p.level, count(r.*) as num_req ' \
        'FROM programs p ' \
        'LEFT JOIN requirements r ON r.program_id = p.id ' \
        'GROUP BY p.id ' \
        'ORDER BY p.level ',
        page: params[:page], per_page: params[:per_page]
      )
    render json: {
      programs: programs,
      pagination: {
        total_pages: programs.total_pages,
        current_page: programs.current_page,
        next_page: programs.next_page || 0
      }
    }
  end

  # Returns a single program record
  def show
    render json: @program
  end

  # Updates a single program with new attributes
  # Accepts attributes for requirements
  def update
    if @program.update(program_params)
      render json: @program
    else
      render_errors @program
    end
  end

  # Creates a single program
  # Accepts attributes for requirements
  def create
    program = Program.new(program_params)
    if program.save
      render json: program
    else
      render_errors program
    end
  end

  # Deletes a single program record with adjoined requirements
  def destroy
    @program.destroy
  end

  private

  # Checks for proper program paramters during submission
  # NOTE ('to self') submitted attributes must be labeled exactly as seen below
  def program_params
    params.reqiure(:program).permit(
      :title, :description, :level,
      requirements_attributes: %i[title description level]
    )
  end

  # Sets the program that is to be worked with
  def set_program
    @program = Program.find(params[:id])
  end
end
