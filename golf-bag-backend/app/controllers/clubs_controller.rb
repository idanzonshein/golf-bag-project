class ClubsController < ApplicationController
  def index
    clubs = Club.where(bag_id:params[:bag_id])
    render json: clubs.to_json
  end



  def create
    bag = Bag.find(params[:bag_id])
    club = bag.clubs.new(club_params)
    if club.save
      render json: club.to_json
    else
      render json: club.errors
    end
  end


private

  def club_params
    params.require(:club).permit(
      :club_type,
      :loft,
      :brand,
      :model,
      :price,
      :handedness,
      :lie,
      :bag_id
    )
  end



end