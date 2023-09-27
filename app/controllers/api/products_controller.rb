class Api::ProductsController < ApplicationController
    def index 
        @products = Product.all 
        
        render 'api/products/index'
    end

    def show 
        @product = Product.find(params[:id])
        render 'api/products/show'
    end 


    def search
        query = params[:query]
        @products = Product.where('name ILIKE ?', "%#{query}%")
        render 'api/products/index'
        # render 'api/products/search'
    end
end