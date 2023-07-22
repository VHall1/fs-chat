class Channel < ApplicationRecord
  has_many :messages
  belongs_to :owner, class_name: 'User'
end
