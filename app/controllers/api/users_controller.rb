class Api::UsersController < ApplicationController
      
    skip_before_action :verify_authenticity_token

    wrap_parameters include: User.attribute_names + ['password']

    before_action :require_logged_out, only: [:create]
    
    def create
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end

    rescue ActiveRecord::RecordNotUnique => e 
        render json: { error: 'Email already taken' }, status: 422
    end


    private

    def user_params
        params.require(:user).permit(:email, :password)
    end

end
