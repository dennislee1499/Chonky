class Api::CsrfController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index]


  def index
  allowed_origins = ['http://localhost:3000', 'https://chonky-web-service.onrender.com']
  
  if allowed_origins.include?(request.origin)
    response.headers['Access-Control-Allow-Origin'] = request.origin
  end

  response.headers['Access-Control-Allow-Credentials'] = 'true'
  render json: { csrf_token: form_authenticity_token }
end

end
