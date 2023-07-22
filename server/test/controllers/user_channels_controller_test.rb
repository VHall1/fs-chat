require "test_helper"

class UserChannelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_channel = user_channels(:one)
  end

  test "should get index" do
    get user_channels_url, as: :json
    assert_response :success
  end

  test "should create user_channel" do
    assert_difference("UserChannel.count") do
      post user_channels_url, params: { user_channel: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show user_channel" do
    get user_channel_url(@user_channel), as: :json
    assert_response :success
  end

  test "should update user_channel" do
    patch user_channel_url(@user_channel), params: { user_channel: {  } }, as: :json
    assert_response :success
  end

  test "should destroy user_channel" do
    assert_difference("UserChannel.count", -1) do
      delete user_channel_url(@user_channel), as: :json
    end

    assert_response :no_content
  end
end
