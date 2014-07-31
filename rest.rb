
require 'sinatra'
require 'json'

configure do
  set :port, 9494
end

before do
	content_type :json
	headers 'Access-Control-Allow-Origin' => '*', 
			'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
end

get '/authors' do
	#content_type 'application/json'
	$i = 1
	$total = 13
	array = []
	json = {}

	begin
		json[:"#$i"] = { :id => "#$i", :name => "name #$i", :photo => "#$i.jpg", :twitter => "@tuit#$i", :url => "https://www.google.com.pe/?q=#$i" }
		array.push(json[:"#$i"])
		$i +=1
	end while $i < $total

	array.to_json
end


get '/authors/:id' do
	array = []
	json = {}

	json = { :head => "ok" }
	array.push(json)
	
	json.to_json
end