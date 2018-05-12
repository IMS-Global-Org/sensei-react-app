class Api::HomePagePostingsController < ApplicationController
  skip_before_action :authenticate_user!, raise: false, only: [ :index, :show ]
  before_action :set_posting, except: [ :index, :create ]

  def index
    authorize! :read, HomePagePosting
    # total_entries = HomePagePosting.all.count
    postings = HomePagePosting
      .includes(:home_page_videos, :home_page_links, :home_page_photos)
      .group(:id)
      .order(:created_at)
      .page(params[:page]).per_page(params[:per])

    render_paginated_model postings, include: [
      :home_page_videos,
      :home_page_links,
      home_page_photos: {methods: :photo_url},
    ]
  end


  def show
    authorize! :read, HomePagePosting
    render json: @posting
  end

  def create
    authorize! :create, HomePagePosting
    posting = HomePagePosting.new(posting_params)
    if posting.save
      render json: posting
    else
      render_errors(posting)
    end
  end

  def update
    authorize! :update, HomePagePosting
    if @posting.update(posting_params)
      render json: @posting
    else
      render_errors(@posting)
    end
  end

  def destroy
    authorize! :destroy, HomePagePosting
    @posting.destroy
  end

  private

  def posting_params
    unless params[:home_page_posting][:home_page_photo].nil?
      params[:home_page_posting][:home_page_photo_attributes][:base_photo].delete(:file)
    end
    params
      .required(:home_page_posting)
      .permit(
        :title,
        :message,
        home_page_videos_attributes: [
          :id, :title, :identifier, :source,
          :created_at, :updated_at,
        ],
        home_page_links_attributes: [
          :title, :url, :abbreviation, :description
        ],
        home_page_photo_attributes: [
          :id, :created_at, :updated_at,
          :title, :description, :active, :viewable,
          base_photo: [
            :name, :base64, :type, :size,
          ]
        ],
      )
  end

  def set_posting
    @posting = HomePagePosting.find(params[:id])
  end
end
