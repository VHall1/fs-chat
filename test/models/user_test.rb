require "test_helper"

class UserTest < ActiveSupport::TestCase
  test 'randomly assigns a 4-digit discriminator for a new user' do
    user = User.new(username: 'test')
    user.save
    assert_not_nil user.discriminator
  end

  test 'should not allow duplicate discriminators for the same username' do
    user1 = User.new(username: 'test', discriminator: '0001')
    user1.save
    user2 = User.new(username: 'test', discriminator: '0001')
    assert_not user2.save, 'Saved the user with a duplicate discriminator'
  end

  test 'should not allow blank usernames' do
    user = User.new(username: '')
    assert_not user.save, 'Saved the user with a blank username'
  end

  test 'should not allow emails that are not valid' do
    user = User.new(email: 'test')
    assert_not user.save, 'Saved the user with an invalid email'
  end
end
