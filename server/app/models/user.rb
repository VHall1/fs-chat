class User < ApplicationRecord
  has_many :messages
  has_many :channels, through: :user_channels
  has_many :owned_channels, class_name: 'Channel', foreign_key: :owner_id

  has_secure_password

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :username, length: { maximum: 32 }
  validate :discriminator_unique_for_username

  before_create :generate_discriminator!

  def discriminator_unique_for_username
    return unless User.where(username:, discriminator:).where.not(id:).exists?

    errors.add(:discriminator, 'is already taken')
  end

  def generate_discriminator
    existing_discriminators = User.where(username:).pluck(:discriminator)
    available_discriminators = ('0000'..'9999').to_a - existing_discriminators
    available_discriminators.sample || raise('Could not generate a unique discriminator')
  end

  def generate_discriminator!
    self.discriminator = generate_discriminator
  end
end
