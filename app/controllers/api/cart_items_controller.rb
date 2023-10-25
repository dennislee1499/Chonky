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


    def update
    @cart_item = CartItem.find_by(id: params[:id])

    if @cart_item.nil?
        render json: { error: 'CartItem not found' }, status: :not_found
        return
    end

    new_quantity = params[:quantity].to_i 
    @cart_item.update!(quantity: new_quantity)
      render json: @cart_item
end


    def destroy
    @cart_item = CartItem.find_by(id: params[:id])

    if @cart_item.nil?
        Rails.logger.error "Could not find CartItem with ID: #{params[:id]}"
        render json: { error: 'CartItem not found' }, status: :not_found
    else
        @cart_item.destroy
        render json: { message: 'Cart item deleted successfully' }
    end
    end

    def clear 
        @cart_items = CartItem.where(user_id: current_user.id)

        if @cart_items.destroy_all
            render json: { message: 'Cart cleared successfully' }
        else
            render json: { error: 'Failed to clear cart' }, status: :unproccessable_entity
        end
    end


    private 

    def cart_params 
        params.permit(:user_id, :product_id, :quantity, :size, :flavor, :price)
    end
end


