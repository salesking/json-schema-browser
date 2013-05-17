require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sk_api_schema'
require 'haml'
require 'sinatra/partial'

get '/' do
  @schemas = SK::Api::Schema.read_all('v1.0')
  @sorted_schemas = sort_schemas_by_category(@schemas)
  haml :index
  end

get '/table' do
  @schemas = SK::Api::Schema.read_all('v1.0')
  @sorted_schemas = sort_schemas_by_category(@schemas)
  haml :table
end

get '/schemas' do
  content_type :json
  SK::Api::Schema.read_all('v1.0').to_json
  end

get '/changelog' do
  @content = File.read(params[:topic] + ".md")
  haml :changelog
end

# TODO enhance the schema itself to support such a descition on object level
def sort_schemas_by_category(schemas)
  sorted_schemas=[]
  categories = {
    documents: %w(document invoice credit_note order estimate payment_reminder recurring line_item divider_item sub_total_item),
    contacts: %w(contact client address),
    templates: %w(pdf_template email_template text_template export_template),
    system: %w(company user language sub auth_permission),
    supportive: %w(tag email comment attachment export payment product)
  }
  categories.each do |cat, obj_types|
    sorted_schemas << cat
    sorted_schemas << schemas.select{|obj| obj_types.include?(obj[:title]) }.sort{|a,b| a[:title].humanize <=> b[:title].humanize }
  end
  sorted_schemas
end