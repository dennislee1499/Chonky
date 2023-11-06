json.cart_items @cart_items do |cart_item|
    json.set! cart_item.id do
        json.extract! cart_item, :id, :user_id, :product_id, :quantity, :size, :flavor, :price
    end
end