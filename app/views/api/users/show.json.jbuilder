json.user do
        json.extract! @user, :id, :email, :errors, :created_at, :updated_at
    end
