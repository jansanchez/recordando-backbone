
require 'sinatra'
require 'json'

configure do
  set :port, 9494
end

get '/' do
	content_type 'application/json'
	json = {}

	$i = 1
	$total = 13

	begin
		json[:"#$i"] = { :id => "#$i", :titulo => "titulo #$i", :imagen => "#$i.jpg", :twitter => "@tuit#$i", :url => "https://www.google.com.pe/?q=#$i" }
		$i +=1
	end while $i < $total

	json.to_json
end

# http://localhost:9494/img/1.jpg

