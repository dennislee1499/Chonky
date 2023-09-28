class Api::CartItemsController < ApplicationController
    before_action :require_logged_in

    def create 
        @cart_item = CartItem.find_by(product_id: params[:product_id])
    end

    def destroy

    end
end
