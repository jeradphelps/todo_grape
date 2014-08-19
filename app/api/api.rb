module API
  class Root < Grape::API

    # a pull request.5
    helpers do
      def authenticate! access_token
        error!('401 Unauthorized', 401) unless AccessToken.find_by(:token => access_token)
      end
    end
  
    mount API::TodosV1
    mount API::AccessTokensV1

    add_swagger_documentation :base_path => "http://localhost:3000/api", 
                              :markdown => true, 
                              :hide_documentation_path => true
  end
end