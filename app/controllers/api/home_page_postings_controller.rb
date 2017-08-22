class Api::HomePagePostingsController < ApplicationController
  before_action :set_posting, except: [ :index, :create ]

  # Requires pagination for displaying
  # def index
  #   # Holder for the database sets that are acquired
  #   json_set = []
  #   # first acquire the posting set to be displayed
  #   postings = HomePagePosting
  #     .includes(:home_page_videos, :home_page_links)
  #     .order(:created_at)
  #     .page(params[:page]).per(params[:per])
  #
  #   # loop over the postings and gather their video and link sets
  #   postings.each do |posting|
  #     # acquire the videos
  #     videos = HomePageVideo.where('home_page_posting_id = ? ', posting.id)
  #     # acquire the links
  #     links = HomePageLink.where('home_page_posting_id = ? ', posting.id)
  #     # insert into the json_set as individual packages
  #     json_set << { posting: posting, videos: videos, links: links }
  #   end
  #   # return all the joined postings as a single json data set
  #   render json: {
  #     data: json_set,
  #     pagination: {
  #       total_pages: postings.total_pages,
  #       current_page: postings.current_page,
  #       next_page: postings.next_page
  #     }
  #   }
  # end

  def index
    # NOTE carryout the record count first manually as seen here, 'total_entries'
    # http://www.rubydoc.info/github/mislav/will_paginate/WillPaginate%2FActiveRecord%2FBaseMethods%3Apaginate_by_sql
    total_entries = HomePagePosting.all.count
    postings = HomePagePosting
      .paginate_by_sql(
        'SELECT p.*, json_agg( DISTINCT(v.*) ) as videos, ' \
          'json_agg( DISTINCT(l.*) ) as links ' \
        'FROM home_page_postings p ' \
        'LEFT JOIN home_page_videos v ON v.home_page_posting_id = p.id ' \
        'LEFT JOIN home_page_links l ON l.home_page_posting_id = p.id ' \
        'GROUP BY p.id ' \
        'ORDER BY p.created_at ',
        page: params[:page], per_page: params[:per], total_entries: total_entries
      )
    render json: {
      data: postings,
      pagination: {
        total_pages: postings.total_pages,
        current_page: postings.current_page,
        next_page: postings.next_page || 0
      }
    }
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
        home_page_videos_attributes: [ :title, :identifier, :source ],
        home_page_links_attributes: [ :title, :url, :abbreviation, :description]
      )
  end

  def set_posting
    @posting = HomePagePosting.find(params[:id])
  end
end
