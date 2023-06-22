class User < ApplicationRecord
  has_many :messages

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
  validates :username, presence: true, length: { maximum: 32 }
  validate :discriminator_unique_for_username

  before_create :generate_discriminator!

  def discriminator_unique_for_username
    return unless User.exists?(username:, discriminator:)

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
