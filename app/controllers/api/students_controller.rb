class Api::StudentsController < ApplicationController
  include ActionController::MimeResponds
  include StudentCSV
  include StudentPdf

  before_action :authenticate_user!
  before_action :set_student, only: %I[show update destroy]

  def index
    authorize! :read, Student
    students = Student
      .where(
        'level like ? AND  belt like ?',
        params[:level] + '%', params[:belt] + '%'
      )
      .order(belt: :asc, level: :asc)
      .page(params[:page]).per_page(params[:per_page])

    render json: {
      data: students,
      pagination: {
        total_pages: students.total_pages,
        current_page: students.current_page,
        next_page: students.next_page || 0
      }
    }
  end

  def query
    authorize! :read, Student
    min_age = params[:query][:min_age]
    max_age = params[:query][:max_age]
    students = Student
      .where(
        'first ~* ? AND last ~* ? AND belt ~* ? AND level ~* ? AND gender ~* ?'\
        + (!min_age.empty? ? " AND date_part('years',age(now(),birthday)) >= #{min_age}" : ' ') \
        + (!max_age.empty? ? " AND date_part('years',age(now(),birthday)) <= #{max_age}" : ' '),
        params[:query][:first] + '.*',
        params[:query][:last] + '.*',
        params[:query][:belt] + '.*',
        params[:query][:level] + '.*',
        "^#{params[:query][:gender]}.*"
      )
      .order(last: :asc, belt: :asc, level: :asc)
      .page(params[:page]).per_page(params[:per_page])
    render json: {
      data: students,
      pagination: {
        total_pages: students.total_pages,
        current_page: students.current_page,
        next_page: students.next_page || 0
      }
    }
  end

  def show
    authorize! :read, Student
    render json: @student
  end

  def update
    authorize! :update, Student
    if @student.update(student_params)
      render json: @student
    else
      render_errors @student
    end
  end

  def create
    authorize! :create, Student
    student = Student.new(student_params)
    if student.save
      render json: student
    else
      render_errors student
    end
  end

  def destroy
    authorize! :destroy, Student
    @student.destroy
  end

  def pdf
    authorize! :read, Student
    min_age = params[:min_age]
    max_age = params[:max_age]
    students = Student
      .where(
        'first ~* ? AND last ~* ? AND belt ~* ? AND level ~* ? AND gender ~* ?'\
        + (!min_age.empty? ? " AND date_part('years',age(now(),birthday)) >= #{min_age}" : ' ') \
        + (!max_age.empty? ? " AND date_part('years',age(now(),birthday)) <= #{max_age}" : ' '),
        params[:first] + '.*',
        params[:last] + '.*',
        params[:belt] + '.*',
        params[:level] + '.*',
        "^#{params[:gender]}.*"
      )
      .order(last: :asc, belt: :asc, level: :asc)
    render_pdf students
  end

  def csv
    authorize! :read, Student
    min_age = params[:query][:min_age]
    max_age = params[:query][:max_age]
    students = Student
      .where(
        'first ~* ? AND last ~* ? AND belt ~* ? AND level ~* ? AND gender ~* ?'\
        + (!min_age.empty? ? " AND date_part('years',age(now(),birthday)) >= #{min_age}" : ' ') \
        + (!max_age.empty? ? " AND date_part('years',age(now(),birthday)) <= #{max_age}" : ' '),
        params[:query][:first] + '.*',
        params[:query][:last] + '.*',
        params[:query][:belt] + '.*',
        params[:query][:level] + '.*',
        "^#{params[:query][:gender]}.*"
      )
      .order(last: :asc, belt: :asc, level: :asc)
    render_csv students
  end

  def inactivate; end

  private

  def student_params
    params.require(:student)
      .permit(:id, :first, :last, :birthday, :gender, :photo, :belt, :level,
        phones_attributes: %I[number type owner text active],
        emails_attributes: %I[address type owner html active],
        addresses_attributes: %I[street1 street2 city state zipcode type owner active]
      )
  end

  def set_student
    @student = Student.find(params[:id])
  end
end
