class Api::SessionsController < ApplicationController
    # skip_before_action :verify_authenticity_token

    before_action :require_logged_in, only: [:create, :destroy]
    
    #  def show
    #     @user = current_user
    #     if @user
    #         render 'api/users/show'
    #     else
    #         render json: { user: nil }
    #     end
    # end

    def show
        @user = current_user
        if @user
            response.set_header('X-CSRF-Token', form_authenticity_token)
            render 'api/users/show'
        else
            render json: { user: nil }
        end
    end

    def create
        email = params[:user][:email]
        password = params[:user][:password]
        @user = User.find_by_credentials(email, password)
        if @user
            login(@user)
            render 'api/users/show'
        else
            render json: { errors: ['Invalid credentials'] }, status: 422
        end
    end

    def destroy
        logout
        head :no_content # populate http response with no content => no body
    end
end
