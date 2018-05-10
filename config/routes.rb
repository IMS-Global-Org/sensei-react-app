# == Route Map
#
#                                 Prefix Verb     URI Pattern                                                              Controller#Action
#                       new_user_session GET      /api/auth/sign_in(.:format)                                              devise_token_auth/sessions#new
#                           user_session POST     /api/auth/sign_in(.:format)                                              devise_token_auth/sessions#create
#                   destroy_user_session DELETE   /api/auth/sign_out(.:format)                                             devise_token_auth/sessions#destroy
#                      new_user_password GET      /api/auth/password/new(.:format)                                         devise_token_auth/passwords#new
#                     edit_user_password GET      /api/auth/password/edit(.:format)                                        devise_token_auth/passwords#edit
#                          user_password PATCH    /api/auth/password(.:format)                                             devise_token_auth/passwords#update
#                                        PUT      /api/auth/password(.:format)                                             devise_token_auth/passwords#update
#                                        POST     /api/auth/password(.:format)                                             devise_token_auth/passwords#create
#               cancel_user_registration GET      /api/auth/cancel(.:format)                                               devise_token_auth/registrations#cancel
#                  new_user_registration GET      /api/auth/sign_up(.:format)                                              devise_token_auth/registrations#new
#                 edit_user_registration GET      /api/auth/edit(.:format)                                                 devise_token_auth/registrations#edit
#                      user_registration PATCH    /api/auth(.:format)                                                      devise_token_auth/registrations#update
#                                        PUT      /api/auth(.:format)                                                      devise_token_auth/registrations#update
#                                        DELETE   /api/auth(.:format)                                                      devise_token_auth/registrations#destroy
#                                        POST     /api/auth(.:format)                                                      devise_token_auth/registrations#create
#                api_auth_validate_token GET      /api/auth/validate_token(.:format)                                       devise_token_auth/token_validations#validate_token
#                       api_auth_failure GET      /api/auth/failure(.:format)                                              devise_token_auth/omniauth_callbacks#omniauth_failure
#                                        GET      /api/auth/:provider/callback(.:format)                                   devise_token_auth/omniauth_callbacks#omniauth_success
#                                        GET|POST /omniauth/:provider/callback(.:format)                                   devise_token_auth/omniauth_callbacks#redirect_callbacks
#                       omniauth_failure GET|POST /omniauth/failure(.:format)                                              devise_token_auth/omniauth_callbacks#omniauth_failure
#                                        GET      /api/auth/:provider(.:format)                                            redirect(301)
#                      api_announcements GET      /api/announcements(.:format)                                             api/announcements#index
#                                        POST     /api/announcements(.:format)                                             api/announcements#create
#                       api_announcement GET      /api/announcements/:id(.:format)                                         api/announcements#show
#                                        PATCH    /api/announcements/:id(.:format)                                         api/announcements#update
#                                        PUT      /api/announcements/:id(.:format)                                         api/announcements#update
#                                        DELETE   /api/announcements/:id(.:format)                                         api/announcements#destroy
# api_home_page_posting_home_page_videos GET      /api/home_page_postings/:home_page_posting_id/home_page_videos(.:format) api/home_page_videos#index
#                                        POST     /api/home_page_postings/:home_page_posting_id/home_page_videos(.:format) api/home_page_videos#create
#                    api_home_page_video GET      /api/home_page_videos/:id(.:format)                                      api/home_page_videos#show
#                                        PATCH    /api/home_page_videos/:id(.:format)                                      api/home_page_videos#update
#                                        PUT      /api/home_page_videos/:id(.:format)                                      api/home_page_videos#update
#                                        DELETE   /api/home_page_videos/:id(.:format)                                      api/home_page_videos#destroy
#  api_home_page_posting_home_page_links GET      /api/home_page_postings/:home_page_posting_id/home_page_links(.:format)  api/home_page_links#index
#                                        POST     /api/home_page_postings/:home_page_posting_id/home_page_links(.:format)  api/home_page_links#create
#                     api_home_page_link GET      /api/home_page_links/:id(.:format)                                       api/home_page_links#show
#                                        PATCH    /api/home_page_links/:id(.:format)                                       api/home_page_links#update
#                                        PUT      /api/home_page_links/:id(.:format)                                       api/home_page_links#update
#                                        DELETE   /api/home_page_links/:id(.:format)                                       api/home_page_links#destroy
# api_home_page_posting_home_page_photos GET      /api/home_page_postings/:home_page_posting_id/home_page_photos(.:format) api/home_page_photos#index
#                                        POST     /api/home_page_postings/:home_page_posting_id/home_page_photos(.:format) api/home_page_photos#create
#                    api_home_page_photo GET      /api/home_page_photos/:id(.:format)                                      api/home_page_photos#show
#                                        PATCH    /api/home_page_photos/:id(.:format)                                      api/home_page_photos#update
#                                        PUT      /api/home_page_photos/:id(.:format)                                      api/home_page_photos#update
#                                        DELETE   /api/home_page_photos/:id(.:format)                                      api/home_page_photos#destroy
#                 api_home_page_postings GET      /api/home_page_postings(.:format)                                        api/home_page_postings#index
#                                        POST     /api/home_page_postings(.:format)                                        api/home_page_postings#create
#                  api_home_page_posting GET      /api/home_page_postings/:id(.:format)                                    api/home_page_postings#show
#                                        PATCH    /api/home_page_postings/:id(.:format)                                    api/home_page_postings#update
#                                        PUT      /api/home_page_postings/:id(.:format)                                    api/home_page_postings#update
#                                        DELETE   /api/home_page_postings/:id(.:format)                                    api/home_page_postings#destroy
#                    api_postings_tables GET      /api/postings_tables(.:format)                                           api/postings_tables#index
#                                        POST     /api/postings_tables(.:format)                                           api/postings_tables#create
#                     api_postings_table GET      /api/postings_tables/:id(.:format)                                       api/postings_tables#show
#                                        PATCH    /api/postings_tables/:id(.:format)                                       api/postings_tables#update
#                                        PUT      /api/postings_tables/:id(.:format)                                       api/postings_tables#update
#                                        DELETE   /api/postings_tables/:id(.:format)                                       api/postings_tables#destroy
#                             api_events GET      /api/events(.:format)                                                    api/events#index
#                                        POST     /api/events(.:format)                                                    api/events#create
#                              api_event GET      /api/events/:id(.:format)                                                api/events#show
#                                        PATCH    /api/events/:id(.:format)                                                api/events#update
#                                        PUT      /api/events/:id(.:format)                                                api/events#update
#                                        DELETE   /api/events/:id(.:format)                                                api/events#destroy
#                    api_events_paginate GET      /api/paginate/events(.:format)                                           api/events#paginate
#                           api_programs GET      /api/programs(.:format)                                                  api/programs#index
#                                        POST     /api/programs(.:format)                                                  api/programs#create
#                            api_program GET      /api/programs/:id(.:format)                                              api/programs#show
#                                        PATCH    /api/programs/:id(.:format)                                              api/programs#update
#                                        PUT      /api/programs/:id(.:format)                                              api/programs#update
#                                        DELETE   /api/programs/:id(.:format)                                              api/programs#destroy
#                       api_requirements GET      /api/requirements(.:format)                                              api/requirements#index
#                                        POST     /api/requirements(.:format)                                              api/requirements#create
#                        api_requirement GET      /api/requirements/:id(.:format)                                          api/requirements#show
#                                        PATCH    /api/requirements/:id(.:format)                                          api/requirements#update
#                                        PUT      /api/requirements/:id(.:format)                                          api/requirements#update
#                                        DELETE   /api/requirements/:id(.:format)                                          api/requirements#destroy
#                     query_api_students POST     /api/students/query(.:format)                                            api/students#query
#                       pdf_api_students GET      /api/students/pdf(.:format)                                              api/students#pdf
#                       csv_api_students POST     /api/students/csv(.:format)                                              api/students#csv
#                inactivate_api_students POST     /api/students/inactivate(.:format)                                       api/students#inactivate
#                     api_student_phones GET      /api/students/:student_id/phones(.:format)                               api/phones#index
#                                        POST     /api/students/:student_id/phones(.:format)                               api/phones#create
#                              api_phone GET      /api/phones/:id(.:format)                                                api/phones#show
#                                        PATCH    /api/phones/:id(.:format)                                                api/phones#update
#                                        PUT      /api/phones/:id(.:format)                                                api/phones#update
#                                        DELETE   /api/phones/:id(.:format)                                                api/phones#destroy
#                     api_student_emails GET      /api/students/:student_id/emails(.:format)                               api/emails#index
#                                        POST     /api/students/:student_id/emails(.:format)                               api/emails#create
#                              api_email GET      /api/emails/:id(.:format)                                                api/emails#show
#                                        PATCH    /api/emails/:id(.:format)                                                api/emails#update
#                                        PUT      /api/emails/:id(.:format)                                                api/emails#update
#                                        DELETE   /api/emails/:id(.:format)                                                api/emails#destroy
#                  api_student_addresses GET      /api/students/:student_id/addresses(.:format)                            api/addresses#index
#                                        POST     /api/students/:student_id/addresses(.:format)                            api/addresses#create
#                            api_address GET      /api/addresses/:id(.:format)                                             api/addresses#show
#                                        PATCH    /api/addresses/:id(.:format)                                             api/addresses#update
#                                        PUT      /api/addresses/:id(.:format)                                             api/addresses#update
#                                        DELETE   /api/addresses/:id(.:format)                                             api/addresses#destroy
#                           api_students GET      /api/students(.:format)                                                  api/students#index
#                                        POST     /api/students(.:format)                                                  api/students#create
#                            api_student GET      /api/students/:id(.:format)                                              api/students#show
#                                        PATCH    /api/students/:id(.:format)                                              api/students#update
#                                        PUT      /api/students/:id(.:format)                                              api/students#update
#                                        DELETE   /api/students/:id(.:format)                                              api/students#destroy
#                            api_mailers GET      /api/mailers(.:format)                                                   api/mailers#index
#                                        POST     /api/mailers(.:format)                                                   api/mailers#create
#                             api_mailer GET      /api/mailers/:id(.:format)                                               api/mailers#show
#                                        PATCH    /api/mailers/:id(.:format)                                               api/mailers#update
#                                        PUT      /api/mailers/:id(.:format)                                               api/mailers#update
#                                        DELETE   /api/mailers/:id(.:format)                                               api/mailers#destroy
#                  api_contract_payments GET      /api/contracts/:contract_id/payments(.:format)                           api/payments#index
#                                        POST     /api/contracts/:contract_id/payments(.:format)                           api/payments#create
#                            api_payment GET      /api/payments/:id(.:format)                                              api/payments#show
#                                        PATCH    /api/payments/:id(.:format)                                              api/payments#update
#                                        PUT      /api/payments/:id(.:format)                                              api/payments#update
#                                        DELETE   /api/payments/:id(.:format)                                              api/payments#destroy
#               api_contract_contractees GET      /api/contracts/:contract_id/contractees(.:format)                        api/contractees#index
#                    query_api_contracts POST     /api/contracts/query(.:format)                                           api/contracts#query
#                   details_api_contract GET      /api/contracts/:id/details(.:format)                                     api/contracts#details
#                 archived_api_contracts GET      /api/contracts/archived(.:format)                                        api/contracts#archived
#            add_contractee_api_contract PATCH    /api/contracts/:id/add_contractee(.:format)                              api/contracts#add_contractee
#         delete_contractee_api_contract PATCH    /api/contracts/:id/delete_contractee(.:format)                           api/contracts#delete_contractee
#                          api_contracts GET      /api/contracts(.:format)                                                 api/contracts#index
#                                        POST     /api/contracts(.:format)                                                 api/contracts#create
#                           api_contract GET      /api/contracts/:id(.:format)                                             api/contracts#show
#                                        PATCH    /api/contracts/:id(.:format)                                             api/contracts#update
#                                        PUT      /api/contracts/:id(.:format)                                             api/contracts#update
#                                        DELETE   /api/contracts/:id(.:format)                                             api/contracts#destroy
#               api_contractee_addresses GET      /api/contractees/:contractee_id/addresses(.:format)                      api/addresses#index
#                                        POST     /api/contractees/:contractee_id/addresses(.:format)                      api/addresses#create
#                                        GET      /api/addresses/:id(.:format)                                             api/addresses#show
#                                        PATCH    /api/addresses/:id(.:format)                                             api/addresses#update
#                                        PUT      /api/addresses/:id(.:format)                                             api/addresses#update
#                                        DELETE   /api/addresses/:id(.:format)                                             api/addresses#destroy
#                  api_contractee_emails GET      /api/contractees/:contractee_id/emails(.:format)                         api/emails#index
#                                        POST     /api/contractees/:contractee_id/emails(.:format)                         api/emails#create
#                                        GET      /api/emails/:id(.:format)                                                api/emails#show
#                                        PATCH    /api/emails/:id(.:format)                                                api/emails#update
#                                        PUT      /api/emails/:id(.:format)                                                api/emails#update
#                                        DELETE   /api/emails/:id(.:format)                                                api/emails#destroy
#                  api_contractee_phones GET      /api/contractees/:contractee_id/phones(.:format)                         api/phones#index
#                                        POST     /api/contractees/:contractee_id/phones(.:format)                         api/phones#create
#                                        GET      /api/phones/:id(.:format)                                                api/phones#show
#                                        PATCH    /api/phones/:id(.:format)                                                api/phones#update
#                                        PUT      /api/phones/:id(.:format)                                                api/phones#update
#                                        DELETE   /api/phones/:id(.:format)                                                api/phones#destroy
#               paginate_api_contractees GET      /api/contractees/paginate(.:format)                                      api/contractees#paginate
#                  query_api_contractees GET      /api/contractees/query(.:format)                                         api/contractees#query
#           api_contractee_show_complete GET      /api/contractees/:contractee_id/show_complete(.:format)                  api/contractees#show_complete
#                        api_contractees POST     /api/contractees(.:format)                                               api/contractees#create
#                         api_contractee GET      /api/contractees/:id(.:format)                                           api/contractees#show
#                                        PATCH    /api/contractees/:id(.:format)                                           api/contractees#update
#                                        PUT      /api/contractees/:id(.:format)                                           api/contractees#update
#                                        DELETE   /api/contractees/:id(.:format)                                           api/contractees#destroy
#               query_api_contact_emails POST     /api/contact_emails/query(.:format)                                      api/contact_emails#query
#                     api_contact_emails GET      /api/contact_emails(.:format)                                            api/contact_emails#index
#                                        POST     /api/contact_emails(.:format)                                            api/contact_emails#create
#                      api_contact_email GET      /api/contact_emails/:id(.:format)                                        api/contact_emails#show
#                                        PATCH    /api/contact_emails/:id(.:format)                                        api/contact_emails#update
#                                        PUT      /api/contact_emails/:id(.:format)                                        api/contact_emails#update
#                                        DELETE   /api/contact_emails/:id(.:format)                                        api/contact_emails#destroy
#                                        GET      /*other(.:format)                                                        static#index

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    # Routes for announcements
    resources :announcements
    resources :home_page_postings, shallow: true do
      # TODO: Routes for single changes to the videos, links and photos
      #       by themselves.
      resources :home_page_videos
      resources :home_page_links
      resources :home_page_photos
    end
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
    # Routes for the contracts information
    resources :contracts, shallow: true do
      resources :payments
      resources :contractees, shallow: true, only: [:index]
      post 'query', on: :collection
      get 'details', on: :member
      get 'archived', on: :collection
      patch 'add_contractee', on: :member
      patch 'delete_contractee', on: :member
    end
    # Routes for the contractees information
    resources :contractees, shallow: true, except: [:index] do
      resources :addresses
      resources :emails
      resources :phones
      get 'paginate', on: :collection
      get 'query', on: :collection
      get 'show_complete', to: 'contractees#show_complete'
    end
    # Routes for the contact_emails
    resources :contact_emails, shallow: true do
      post :query, on: :collection
    end
  end

  # Do not place any routes below this one
  get '*other', to: 'static#index'
end
