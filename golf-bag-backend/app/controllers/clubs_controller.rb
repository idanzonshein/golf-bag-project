class ClubsController < ApplicationController
  def index
    clubs = Club.all
    render json: clubs.to_json(
        only: [:id, :name, :brand, :image_source]
  end


end