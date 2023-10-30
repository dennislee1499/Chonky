class Api::ReviewsController < ApplicationController
    before_action :require_logged_in

    def create
        @review = Review.new(review_params)
        @review.author_id = current_user.id

        if @review.save
            render 'api/reviews/show'
        else
          render json: { errors: @review.errors.full_messages }, status: 422
        end
    end


    def update
    @review = Review.find(params[:id])

    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end


    def destroy
        @review = Review.find(params[:id])

        if current_user.id == @review.author_id
            @review.delete
        end
    end

    
    private

    def review_params
        params.permit(:product_id, :name, :title, :body, :rating)
    end
end