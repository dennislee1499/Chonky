json.product do
    json.set! @product.id do 
        json.extract! @product, :id, :name, :category, :price, :rating, :details, :color_options, :flavor_options, :size_options, :created_at, :updated_at
        json.imageUrl @product.image.attached? ? url_for(@product.image) : nil

        json.reviews @product.reviews do |review|
            json.extract! review, :id, :body, :rating, :recommend, :title, :created_at, :updated_at
        end
    end
end