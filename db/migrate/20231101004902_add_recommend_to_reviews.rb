class AddRecommendToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :recommend, :boolean
  end
end
