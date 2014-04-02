module API
  class Root < Grape::API

    helpers do
      def authenticate! access_token
        error!('401 Unauthorized', 401) unless AccessToken.find_by(:token => access_token)
      end
    end
  
    mount API::TodosV1
    mount API::AccessTokensV1
  end
end