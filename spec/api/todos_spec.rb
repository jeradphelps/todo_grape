require 'spec_helper'

describe Todos::API do
  include Rack::Test::Methods

  def app
    Todos::API
  end

  describe Todos::API do
    describe "GET /todos" do
      it "returns an empty array of todos" do
        get "/todos"

        expect(last_response.status).to eq(200)
        expect(JSON.parse(last_response.body)).to eq([])
      end

      it "returns all todos" do
        Todo.create(label: "todo 1")
        Todo.create(label: "todo 2")
        get "/todos"

        expect(last_response.status).to eq(200)
        expect(JSON.parse(last_response.body)).to have(2).things
      end

      it "properly 404's when the resource is wrong" do
        get "/unicorns"
        expect(last_response.status).to eq(404)
      end
    end

    describe "GET /todos/:id" do
      it "returns a todo by id" do
        todo = Todo.create(label: "todo 1")
        Todo.create(label: "todo 2")
        get "/todos/#{todo.id}"
        expect(last_response.status).to eq(200)
        expect(JSON.parse(last_response.body)["label"]).to eq("todo 1")
      end

      it "properly 404's when object does not exist" do
        get "/todos/1"
        expect(last_response.status).to eq(404)
      end
    end

    describe "POST /todos" do
      it "creates a todo" do
        post "/todos", { label: "this is a label" }
        expect(Todo.count).to eq(1)
        expect(Todo.first.label).to eq("this is a label")

        # we expect to get the object back after a create
        expect(JSON.parse(last_response.body)["label"]).to eq("this is a label")
      end
    end

    describe "PUT /todos/:id" do
      it "updates a todo" do
        todo = Todo.create(label: "original text")
        put "/todos/#{todo.id}", { label: "updated text", done: true }
        expect(Todo.count).to eq(1)
        expect(Todo.first.label).to eq("updated text")
        expect(Todo.first.done).to eq(true)

        # we expect to get the object back after an update
        expect(JSON.parse(last_response.body)["label"]).to eq("updated text")
      end

      it "properly 404's when object does not exist" do
        put "/todos/1", { label: "updated text" }
        expect(last_response.status).to eq(404)
      end
    end

    describe "DELETE /todos/:id" do
      it "deletes a todo" do
        todo = Todo.create(label: "soon to be gone")
        delete "/todos/#{todo.id}"
        expect(Todo.count).to eq(0)

        # we expect to get the object back after an delete
        expect(JSON.parse(last_response.body)["label"]).to eq("soon to be gone")
      end

      it "properly 404's when object does not exist" do
        delete "/todos/1"
        expect(last_response.status).to eq(404)
      end
    end
  end
end
