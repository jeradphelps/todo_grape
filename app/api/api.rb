module API
  class Root < Grape::API
    mount API::TodosV1
  end
end