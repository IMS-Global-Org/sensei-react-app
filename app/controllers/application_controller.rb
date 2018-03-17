# Base Controller Class
class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  # Helper for rendering general errors produced by ActiveRecord models
  # @param model [ActiveRecord] any ActiveRecord model
  # @return [String] json formatted string respresentation of the model
  def render_errors(model)
    render json: { errors: model.errors.full_messages.join(',\n')}, status: 422
  end

  # Helper method - takes a paginated model by will_paginate and creates
  # a JSON object that includes the models data and the needed pagination
  # data for creating paginated html elements.
  # NOTE: **option: additional params for the to_json method
  # @param model [ActiveRecord] the paginated ActiveRecord Model
  # @param options [Hash] to_json method optional parsing parameter
  def render_paginated_model(model, **options)
    render json: {
      data: model,
      pagination: {
        total_pages: model.total_pages,
        current_page: model.current_page,
        next_page: model.next_page
      }
    }, **options
  end

  # Helper for setting the current_policy used by AccessGranted gem
  # Since we are using Devise, current_user does not represent the actual
  # User model; so we must forcibly locate the User model from the current_user
  # variable created/set by Devise.
  def current_policy
    @current_policy ||= ::AccessPolicy.new(User.find(current_user.id))
  end

  rescue_from AccessGranted::AccessDenied do |exception|
    redirect_to '/', alert: "You don't have permissions to access this page."
  end

end
