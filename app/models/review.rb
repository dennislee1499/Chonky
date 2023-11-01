class Review < ApplicationRecord
    validates :rating, presence: true

    belongs_to :user,
    foreign_key: :author_id,
    class_name: :User

    belongs_to :product
end
