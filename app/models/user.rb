# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  demo_user       :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  full_name       :string
#
class User < ApplicationRecord
    has_secure_password

    before_validation :ensure_session_token

    validates :full_name, presence: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }

    has_many :cart_items,
    dependent: :destroy

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end


    def reset_session_token!
        new_token = generate_unique_session_token
        self.update!(session_token: new_token)
        return new_token
    end


    private

    def generate_unique_session_token
        loop do
            token = SecureRandom.base64
            next if User.exists?(session_token: token)
            return token
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end

