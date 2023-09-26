class ProductSelection < ApplicationRecord
  belongs_to :product
  validates :size, :price, presence: true 
end
