class AccessTokensV1 < Grape::API
  version 'v1', using: :header, vendor: 'jerad'
  format :json

  resource :access_tokens do
    desc "Create an Access Token."
    params do
      requires :username, type: String, desc: "Your Username."
      requires :password, type: String, desc: "Your Password."
    end
    post do
      if(params[:username] == "username" && params[:password] == "password")
        AccessToken.create!
      else
        error!('401 Unauthorized', 401)
      end
    end
  end
end
