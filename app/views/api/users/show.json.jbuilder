json.user do
        json.extract! @user, :id, :email, :full_name, :errors, :created_at, :updated_at
    end
