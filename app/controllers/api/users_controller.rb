class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: :create
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)

    if @user.save
        login(@user)
        render 'api/users/show'
    else
        render json: { errors: @user.errors.full_messages}, status: 422
    end
  end


  def show
  @user = User.find_by(id: params[:id])
  if @user
    render 'api/users/show'
  else
    render json: { error: "User not found" }, status: :not_found
  end
end


  def checkout
  @user = User.find_by(id: params[:id])
    if @user
    @user.cart_items.destroy_all
    render json: { message: "Checkout successful" }, status: :ok
  else
    render json: { error: "User not found" }, status: :not_found
    end
  end
end