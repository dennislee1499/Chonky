# == Schema Information
#
# Table name: products
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  category       :string           not null
#  price          :float            not null
#  rating         :float            not null
#  details        :string           not null
#  color_options  :string           default([]), is an Array
#  flavor_options :string           default([]), is an Array
#  size_options   :string           default([]), is an Array
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Product < ApplicationRecord
    validates :name, :category, :price, :rating, :details, presence: true 

    has_many :reviews 
    has_many :ratings

    has_many :cart_items,
    dependent: :destroy
    
    has_one_attached :image
end
