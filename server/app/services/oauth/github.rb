module OAuth
  class GitHub
    OAUTH_URL = "https://github.com/login/oauth"
    OAUTH_SCOPE = "user:email"

    def self.authorize_url
      "#{OAUTH_URL}/authorize?client_id=#{ENV['GITHUB_CLIENT_ID']}&scope=#{OAUTH_SCOPE}"
    end

    def self.get_token(code)
      response = client.post do |req|
        req.url '/access_token'
        req.headers['Accept'] = 'application/json'
        req.body = {
          client_id: ENV['GITHUB_CLIENT_ID'],
          client_secret: ENV['GITHUB_CLIENT_SECRET'],
          code: code
        }
      end
      response.body
    end

    def self.get_user(token)
      response = client.get do |req|
        req.url '/user'
        req.headers['Authorization'] = "token #{token}"
        req.headers['Accept'] = 'application/json'
      end
      response.body
    end

    private

    def self.client
      @client ||= Faraday.new(url: OAUTH_URL) do |faraday|
        faraday.request :url_encoded
        faraday.adapter Faraday.default_adapter
      end
    end
  end
end
