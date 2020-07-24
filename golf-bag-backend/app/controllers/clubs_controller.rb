class ClubsController < ApplicationController
  def index
    clubs = Club.all
    render json: clubs.to_json
  end


end