class ReferralCode < ApplicationRecord
  belongs_to :user
  belongs_to :channel

  validates :code, presence: true, uniqueness: true
end
