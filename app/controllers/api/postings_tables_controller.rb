class Api::PostingsTablesController < ApplicationController
  before_action :set_posting, except: [ :index, :create ]

  def index
    authorize! :read, HomePagePosting
    # query the database while making the necessary adjustments to format
    postings = HomePagePosting
      .select(
        'home_page_postings.*, ' \
        'count(distinct home_page_videos.*) as videos, ' \
        'count(distinct home_page_links.*) as links, ' \
        'count(distinct home_page_photos.*) as photos '
      )
      .joins(:home_page_videos, :home_page_links, :home_page_photos)
      .group('home_page_postings.id')
      .page(params[:page]).per_page(params[:per])

    render_paginated_model postings
  end

  def show
    authorize! :read, HomePagePosting
    if @posting
      videos = HomePageVideo
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      links = HomePageLink
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      photos = HomePagePhoto
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      render json: {
        id: @posting.id,
        title: @posting.title,
        message: @posting.message,
        videos: videos,
        links: links,
        photos: photos.as_json(methods: :photo_url)
      }
    else
      render_error @posting
    end
  end

  def create
    authorize! :create, HomePagePosting
    posting = HomePagePosting.new(posting_params)
    if posting.save
      render json: posting
    else
      render_error posting
    end
  end

  def update
    authorize! :update, HomePagePosting
    if @posting.update(posting_params)
      videos = HomePageVideo
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      links = HomePageLink
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      photos = HomePagePhoto
        .all.where('home_page_posting_id = ?', @posting.id).order(updated_at: :desc)
      render json: {
        id: @posting.id,
        title: @posting.title,
        # message: @posting.message,
        videos: videos.count,
        links: links.count,
        photos: photos.count,
        created_at: @posting.created_at
      }
    else
      render_error @posting
    end
  end

  def destroy
    authorize! :destroy, HomePagePosting
    @posting.destroy
  end

  private

  def set_posting
    @posting = HomePagePosting.find(params[:id])
  end

  def posting_params
    params.require(:home_page_posting)
      .permit(:id, :title, :message, :created_at, :updated_at,
        home_page_videos_attributes: [
          :id, :title, :identifier, :source,
          :notes, :home_page_posting_id, :_destroy
        ],
        home_page_links_attributes: [
          :id, :title, :url, :abbreviation,
          :description, :home_page_posting_id, :_destroy
        ],
        home_page_photos_attributes: [
          :id, :title, :description, :active, :viewable,
          :created_at, :updated_at,
          base_photo: [:name, :base64, :type, :size],
        ]
      )
  end
end
