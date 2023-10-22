class Api::CartItemsController < ApplicationController
    before_action :require_logged_in


    def create 
    @cart_item = CartItem.find_by(product_id: params[:product_id])

    if @cart_item
        @cart_item.update!(quantity: params[:quantity])
        render 'api/cart_items/show'
    else
        @cart_item = CartItem.new(cart_params)
        @user = current_user

        if @cart_item.save
            render 'api/cart_items/show'
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end
end


    def destroy
        @cart_item = CartItem.find(params[:id])
        @cart_item.delete
    end

    private 

    def cart_params 
        params.permit(:user_id, :product_id, :quantity, :size, :flavor, :price)
    end
end
