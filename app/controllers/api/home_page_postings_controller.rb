class Api::HomePagePostingsController < ApplicationController
  skip_before_action :authenticate_user!, raise: false, only: [ :index, :show ]
  before_action :set_posting, except: [ :index, :create ]

  def index
    # total_entries = HomePagePosting.all.count
    postings = HomePagePosting
      .includes(:home_page_videos, :home_page_links)
      .group(:id)
      .order(:created_at)
      .page(params[:page]).per_page(params[:per])

    render_paginated_model postings, include: [:home_page_videos, :home_page_links]
  end


  def show
    render json: @posting
  end

  def create
    posting = HomePagePosting.new(posting_params)
    if posting.save
      render json: posting
    else
      render_errors(posting)
    end
  end

  def update
    if @posting.update(posting_params)
      render json: @posting
    else
      render_errors(@posting)
    end
  end

  def destroy
    @posting.destroy
  end

  private

  def posting_params
    params
      .required(:home_page_posting)
      .permit(
        :title,
        :message,
        home_page_videos_attributes: [
          :id, :title, :identifier, :source,
          :created_at, :updated_at,
        ],
        home_page_links_attributes: [ :title, :url, :abbreviation, :description]
      )
  end

  def set_posting
    @posting = HomePagePosting.find(params[:id])
  end
end
