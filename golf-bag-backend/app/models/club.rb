class Club < ApplicationRecord
  belongs_to :bag, optional: true
end
