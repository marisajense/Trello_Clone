class Board < ApplicationRecord
  # Validations
  validates_presence_of :name

  # Associations
  belongs_to :user
  has_many :lists

  # Callbacks

  # Instance Methods

  # Class Methods
end
