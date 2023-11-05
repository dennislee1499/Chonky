json.reviews @reviews do |review|
    json.set! review.id do
        json.extract! review, :id, :body, :author_id, :product_id, :name, :title, :rating, :recommend
    end
end