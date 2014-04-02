class TodosV1 < Grape::API
  version 'v1', using: :header, vendor: 'jerad'
  format :json

  resource :todos do
    desc "Return all todos."
    get do
      Todo.order("created_at asc")
    end

    desc "Return a todo."
    params do
      requires :id, type: Integer, desc: "Status id."
    end
    route_param :id do
      get do
        Todo.find_by_id(params[:id]) || error!("Not Found", 404)
      end
    end

    desc "Create a todo."
    params do
      requires :label, type: String, desc: "Todo label."
      # requires :access_token, type: String, desc: "Your Access Token."
    end
    post do
      authenticate! params[:access_token]
      Todo.create!({
        label: params[:label]
      })
    end

    desc "Update a Todo."
    params do
      requires :id, type: Integer, desc: "Todo ID."
      requires :label, type: String, desc: "Todo label."
      # requires :access_token, type: String, desc: "Your Access Token."
    end
    put ':id' do
      authenticate! params[:access_token]
      todo = Todo.find_by_id(params[:id]) || error!("Not Found", 404)
      todo.update({
        label: params[:label],
        done: params[:done]
      })
      todo
    end

    desc "Delete a Todo."
    params do
      requires :id, type: Integer, desc: "Todo ID."
      # requires :access_token, type: String, desc: "Your Access Token."
    end
    delete ':id' do
      authenticate! params[:access_token]
      todo = Todo.find_by_id(params[:id]) || error!("Not Found", 404)
      todo.destroy
    end
  end
end
