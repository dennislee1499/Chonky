json.cart do
    json.extract! @cart_item, :id, :quantity, :user_id, :product_id, :size, :flavor, :price
end