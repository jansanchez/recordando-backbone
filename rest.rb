
require 'sinatra'
require 'json'

configure do
  set :port, 9494
end

before do
	content_type :json
	headers 'Access-Control-Allow-Origin' => '*', 
			'Access-Control-Allow-Methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			'Access-Control-Allow-Headers' => 'X-Requested-With, X-Prototype-Version',
			'Access-Control-Max-Age' => '1728000'
end


get "/" do
  redirect '/index.html'
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


delete "/authors/:id" do # curl -X DELETE http://localhost:9494/authors/5

	array = []
	json = {}

	json = {:data => { :id => "#{params[:id]}" }, "msg" => "Eliminado correctamente", :status => "1"}
	array.push(json)	

	array.to_json
end


