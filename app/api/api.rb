module API
  class Root < Grape::API
    mount API::TodosV1
    mount API::AccessTokensV1
  end
end