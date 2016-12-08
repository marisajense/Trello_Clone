class List < ApplicationRecord
  validates_presence_of :title

  belongs_to :board
end
