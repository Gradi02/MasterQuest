class Certificate < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, presence: true, length: { maximum: 1000 }
  validates :user_id, presence: true
end
