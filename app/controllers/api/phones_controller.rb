class Api::PhonesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_phone, only: %I[show update destroy]

  def index
    if params[:contractee_id]
      render json: Contractee
        .find(params[:contractee_id])
        .phones.all
    else
      render json: Phone
        .where('student_id == ?', params[:student_id])
        .order(type_of: :asc)
    end
  end

  def show
    render json: @phone
  end

  def update
    if @phone.update(phone_params)
      render json: @phone
    else
      render_errors @phone
    end
  end

  def create
    phone = Contractee.find(params[:contractee_id]).phones.build(phone_params)
    if phone.save
      render json: phone
    else
      render_errors phone
    end
  end

  def destroy
    @phone.destroy
  end

  private

  def set_phone
    @phone = Phone.find(params[:id])
  end

  def phone_params
    params
      .require(:phone)
      .permit(:id, :phone_number, :type_of, :owner_of, :texting, :active)
  end
end
