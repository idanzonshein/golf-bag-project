class CreateClubs < ActiveRecord::Migration[6.0]
  def change
    create_table :clubs do |t|
      t.string :type
      t.string :loft
      t.string :brand
      t.string :model
      t.integer :price
      t.string :handedness
      t.string :lie
      t.string :image_source
      t.references :bag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
