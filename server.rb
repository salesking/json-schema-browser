require "rubygems"
require "bundler/setup"
require "sinatra"
require "sk_api_schema"


get '/' do
  File.read(File.join('public', 'index.htm'))
end

get '/schemas' do
  content_type :json
  SK::Api::Schema.read_all('v1.0').to_json
end
