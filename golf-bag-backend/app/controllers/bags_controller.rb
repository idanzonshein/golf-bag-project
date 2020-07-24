class BagsController < ApplicationController
  def index
    bags = Bag.all
    render json: bags.to_json(
        only: [:id, :name],
        include: {
            clubs: {
                only: [:id, :brand, :name, :type, :brand]
            }
        }
    )
  end

  def create
    bag = Bag.new(name: params[:name])
    if bag.save
      render json: bag.to_json
    else
      render json: bag.errors
    end
  end

  def destroy
    bag = Bag.find(params[:id])
    bag.destroy
    render json: bag
  end

end