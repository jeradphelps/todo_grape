class Todo < ActiveRecord::Base
  validates_presence_of :label
  validates_uniqueness_of :label
end
