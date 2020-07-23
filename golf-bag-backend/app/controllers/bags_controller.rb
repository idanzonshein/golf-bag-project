class BagsController < ApplicationController
  def index
    bags = Bag.all
    render json: bags.to_json(
        only: [:id, :name, :brand, :image_source],
        include: {
            clubs: {
                only: [:id, :brand, :name, :type]
            }
        }
    )
  end

end