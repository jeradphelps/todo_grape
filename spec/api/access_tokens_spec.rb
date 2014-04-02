require 'spec_helper'

describe AccessTokensV1 do
  include Rack::Test::Methods

  def app
    AccessTokensV1
  end

  describe AccessTokensV1 do
    describe "POST /access_tokens" do
      it "it creates an access_token" do
        post "/access_tokens", { username: "username", password: "password" }
        expect(AccessToken.count).to eq(1)

        # we expect to get the object back after a create
        expect(JSON.parse(last_response.body)["token"]).to_not eq("")
      end

      it "it issues a 400 when no credentials are supplied" do
        post "/access_tokens"
        expect(AccessToken.count).to eq(0)
        expect(last_response.status).to eq(400)
      end

      it "it issues a 401 when a bad username is supplied" do
        post "/access_tokens", { username: "jim", password: "password" }
        expect(AccessToken.count).to eq(0)
        expect(last_response.status).to eq(401)
      end

      it "it issues a 401 when a bad password is supplied" do
        post "/access_tokens", { username: "username", password: "kerfuffle" }
        expect(AccessToken.count).to eq(0)
        expect(last_response.status).to eq(401)
      end

      it "it issues a 401 when bad credentials" do
        post "/access_tokens", { username: "drnick", password: "riveria" }
        expect(AccessToken.count).to eq(0)
        expect(last_response.status).to eq(401)
      end
    end
  end
end
