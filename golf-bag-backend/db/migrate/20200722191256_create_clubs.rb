class CreateClubs < ActiveRecord::Migration[6.0]
  def change
    create_table :clubs do |t|
      t.string :club_type
      t.string :loft
      t.string :brand
      t.string :model
      t.integer :price
      t.string :handedness
      t.string :lie
      t.string :image_source
      t.integer :bag_id

      t.timestamps
    end
  end
end
