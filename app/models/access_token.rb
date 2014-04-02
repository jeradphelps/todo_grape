class AccessToken < ActiveRecord::Base
  before_create :generate_token
  
  private
  def generate_token
    self.token = SecureRandom.hex
  end
end
