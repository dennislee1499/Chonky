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
        if query.present?
            @products = Product.where('name ILIKE ?', "%#{query}%")
        else
            @products = Product.all
        end

            render 'api/products/search'
    end

end