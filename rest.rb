
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
	response = []
	json = {}

	file = File.read('public/json/authors.json')
	response = JSON.parse(file)

	response.to_json
end


put "/authors/:id" do

	array = []
	newArray = []
	response = []

	json = {}
	path = 'public/json/authors.json'

	file = File.read(path)
	array = JSON.parse(file)

	req = JSON.parse(request.body.read)

	flag = true
	newRow = {}

	array.each do |row|
		if row["id"] == "#{params[:id]}"
			row["name"] = "#{req['name']}"
			newArray.push(row)
			flag = false
		else
			#puts row 
			newArray.push(row)
		end
	end

#{"id"=>"12", "name"=>"name 12", "photo"=>"12.jpg", "twitter"=>"@tuit12", "url"=>"https://www.google.com.pe/?q=12"}

	if flag
		puts "no entro!!!!"
		newRow = {"id" => "#{params[:id]}", "name"=> "#{req['name']}", "photo" => "#{req['photo']}", "twitter" => "#{req['twitter']}", "url" => "#{req['url']}" }
		puts newRow
		newArray.push(newRow)
	end

	File.write(path, newArray.to_json)

	json = {:data => { :id => "#{params[:id]}" }, "msg" => "Actualizado correctamente", :status => "1"}
	response.push(json)

	response.to_json	
end


delete "/authors/:id" do

	array = []
	newArray = []
	response = []

	json = {}
	path = 'public/json/authors.json'

	file = File.read(path)
	array = JSON.parse(file)
	
	array.each do |row|
		if row["id"] == "#{params[:id]}"
			puts "se eliminara"
		else
			newArray.push(row)
		end
	end

	File.write(path, newArray.to_json)

	json = {:data => { :id => "#{params[:id]}" }, "msg" => "Eliminado correctamente", :status => "1"}
	response.push(json)

	response.to_json
end
