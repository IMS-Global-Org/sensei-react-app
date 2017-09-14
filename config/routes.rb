# == Route Map
#
#                   Prefix Verb     URI Pattern                                   Controller#Action
#         new_user_session GET      /api/auth/sign_in(.:format)                   devise_token_auth/sessions#new
#             user_session POST     /api/auth/sign_in(.:format)                   devise_token_auth/sessions#create
#     destroy_user_session DELETE   /api/auth/sign_out(.:format)                  devise_token_auth/sessions#destroy
#        new_user_password GET      /api/auth/password/new(.:format)              devise_token_auth/passwords#new
#       edit_user_password GET      /api/auth/password/edit(.:format)             devise_token_auth/passwords#edit
#            user_password PATCH    /api/auth/password(.:format)                  devise_token_auth/passwords#update
#                          PUT      /api/auth/password(.:format)                  devise_token_auth/passwords#update
#                          POST     /api/auth/password(.:format)                  devise_token_auth/passwords#create
# cancel_user_registration GET      /api/auth/cancel(.:format)                    devise_token_auth/registrations#cancel
#    new_user_registration GET      /api/auth/sign_up(.:format)                   devise_token_auth/registrations#new
#   edit_user_registration GET      /api/auth/edit(.:format)                      devise_token_auth/registrations#edit
#        user_registration PATCH    /api/auth(.:format)                           devise_token_auth/registrations#update
#                          PUT      /api/auth(.:format)                           devise_token_auth/registrations#update
#                          DELETE   /api/auth(.:format)                           devise_token_auth/registrations#destroy
#                          POST     /api/auth(.:format)                           devise_token_auth/registrations#create
#  api_auth_validate_token GET      /api/auth/validate_token(.:format)            devise_token_auth/token_validations#validate_token
#         api_auth_failure GET      /api/auth/failure(.:format)                   devise_token_auth/omniauth_callbacks#omniauth_failure
#                          GET      /api/auth/:provider/callback(.:format)        devise_token_auth/omniauth_callbacks#omniauth_success
#                          GET|POST /omniauth/:provider/callback(.:format)        devise_token_auth/omniauth_callbacks#redirect_callbacks
#         omniauth_failure GET|POST /omniauth/failure(.:format)                   devise_token_auth/omniauth_callbacks#omniauth_failure
#                          GET      /api/auth/:provider(.:format)                 redirect(301)
#        api_announcements GET      /api/announcements(.:format)                  api/announcements#index
#                          POST     /api/announcements(.:format)                  api/announcements#create
#         api_announcement GET      /api/announcements/:id(.:format)              api/announcements#show
#                          PATCH    /api/announcements/:id(.:format)              api/announcements#update
#                          PUT      /api/announcements/:id(.:format)              api/announcements#update
#                          DELETE   /api/announcements/:id(.:format)              api/announcements#destroy
#   api_home_page_postings GET      /api/home_page_postings(.:format)             api/home_page_postings#index
#                          POST     /api/home_page_postings(.:format)             api/home_page_postings#create
#    api_home_page_posting GET      /api/home_page_postings/:id(.:format)         api/home_page_postings#show
#                          PATCH    /api/home_page_postings/:id(.:format)         api/home_page_postings#update
#                          PUT      /api/home_page_postings/:id(.:format)         api/home_page_postings#update
#                          DELETE   /api/home_page_postings/:id(.:format)         api/home_page_postings#destroy
#      api_postings_tables GET      /api/postings_tables(.:format)                api/postings_tables#index
#                          POST     /api/postings_tables(.:format)                api/postings_tables#create
#       api_postings_table GET      /api/postings_tables/:id(.:format)            api/postings_tables#show
#                          PATCH    /api/postings_tables/:id(.:format)            api/postings_tables#update
#                          PUT      /api/postings_tables/:id(.:format)            api/postings_tables#update
#                          DELETE   /api/postings_tables/:id(.:format)            api/postings_tables#destroy
#               api_events GET      /api/events(.:format)                         api/events#index
#                          POST     /api/events(.:format)                         api/events#create
#                api_event GET      /api/events/:id(.:format)                     api/events#show
#                          PATCH    /api/events/:id(.:format)                     api/events#update
#                          PUT      /api/events/:id(.:format)                     api/events#update
#                          DELETE   /api/events/:id(.:format)                     api/events#destroy
#      api_events_paginate GET      /api/paginate/events(.:format)                api/events#paginate
#             api_programs GET      /api/programs(.:format)                       api/programs#index
#                          POST     /api/programs(.:format)                       api/programs#create
#              api_program GET      /api/programs/:id(.:format)                   api/programs#show
#                          PATCH    /api/programs/:id(.:format)                   api/programs#update
#                          PUT      /api/programs/:id(.:format)                   api/programs#update
#                          DELETE   /api/programs/:id(.:format)                   api/programs#destroy
#         api_requirements GET      /api/requirements(.:format)                   api/requirements#index
#                          POST     /api/requirements(.:format)                   api/requirements#create
#          api_requirement GET      /api/requirements/:id(.:format)               api/requirements#show
#                          PATCH    /api/requirements/:id(.:format)               api/requirements#update
#                          PUT      /api/requirements/:id(.:format)               api/requirements#update
#                          DELETE   /api/requirements/:id(.:format)               api/requirements#destroy
#       query_api_students POST     /api/students/query(.:format)                 api/students#query
#         pdf_api_students GET      /api/students/pdf(.:format)                   api/students#pdf
#         csv_api_students POST     /api/students/csv(.:format)                   api/students#csv
#  inactivate_api_students POST     /api/students/inactivate(.:format)            api/students#inactivate
#       api_student_phones GET      /api/students/:student_id/phones(.:format)    api/phones#index
#                          POST     /api/students/:student_id/phones(.:format)    api/phones#create
#                api_phone GET      /api/phones/:id(.:format)                     api/phones#show
#                          PATCH    /api/phones/:id(.:format)                     api/phones#update
#                          PUT      /api/phones/:id(.:format)                     api/phones#update
#                          DELETE   /api/phones/:id(.:format)                     api/phones#destroy
#       api_student_emails GET      /api/students/:student_id/emails(.:format)    api/emails#index
#                          POST     /api/students/:student_id/emails(.:format)    api/emails#create
#                api_email GET      /api/emails/:id(.:format)                     api/emails#show
#                          PATCH    /api/emails/:id(.:format)                     api/emails#update
#                          PUT      /api/emails/:id(.:format)                     api/emails#update
#                          DELETE   /api/emails/:id(.:format)                     api/emails#destroy
#    api_student_addresses GET      /api/students/:student_id/addresses(.:format) api/addresses#index
#                          POST     /api/students/:student_id/addresses(.:format) api/addresses#create
#              api_address GET      /api/addresses/:id(.:format)                  api/addresses#show
#                          PATCH    /api/addresses/:id(.:format)                  api/addresses#update
#                          PUT      /api/addresses/:id(.:format)                  api/addresses#update
#                          DELETE   /api/addresses/:id(.:format)                  api/addresses#destroy
#             api_students GET      /api/students(.:format)                       api/students#index
#                          POST     /api/students(.:format)                       api/students#create
#              api_student GET      /api/students/:id(.:format)                   api/students#show
#                          PATCH    /api/students/:id(.:format)                   api/students#update
#                          PUT      /api/students/:id(.:format)                   api/students#update
#                          DELETE   /api/students/:id(.:format)                   api/students#destroy
#              api_mailers GET      /api/mailers(.:format)                        api/mailers#index
#                          POST     /api/mailers(.:format)                        api/mailers#create
#               api_mailer GET      /api/mailers/:id(.:format)                    api/mailers#show
#                          PATCH    /api/mailers/:id(.:format)                    api/mailers#update
#                          PUT      /api/mailers/:id(.:format)                    api/mailers#update
#                          DELETE   /api/mailers/:id(.:format)                    api/mailers#destroy
#                          GET      /*other(.:format)                             static#index
#

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    # Routes for announcements
    resources :announcements
    resources :home_page_postings
    resources :postings_tables
    # Routes for calendar events
    resources :events
    get '/paginate/events', to: 'events#paginate', as: 'events_paginate'
    # Routes for programs and requirements
    resources :programs
    resources :requirements
    # Routes for students and their information (shallow nesting of routes)
    resources :students, shallow: true do
      post 'query', on: :collection
      get 'pdf', on: :collection
      post 'csv', on: :collection
      post 'inactivate', on: :collection
      resources :phones
      resources :emails
      resources :addresses
    end
    # Routes for the mailers
    resources :mailers
  end

  # Do not place any routes below this one
  get '*other', to: 'static#index'
end
