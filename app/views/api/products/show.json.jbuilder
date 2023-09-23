json.product do
        json.set! product.id do 
            json.extract! product, :id, :name, :category, :price, :rating, :details, :color_options, :flavor_options, :size_options, :created_at, :updated_at
        end
    end
end