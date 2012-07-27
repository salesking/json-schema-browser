require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sk_api_schema'
require 'haml'
require 'sinatra/partial'

get '/' do
  @schemas = SK::Api::Schema.read_all('v1.0')
  @object_names = @schemas.map{|i| i[:title].humanize }.sort
  haml :index
end

get '/schemas' do
  content_type :json
  SK::Api::Schema.read_all('v1.0').to_json
end