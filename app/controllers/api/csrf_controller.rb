class Api::CsrfController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index]

  def index
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Credentials'] = 'true'

    render json: { csrf_token: form_authenticity_token }
  end
end
