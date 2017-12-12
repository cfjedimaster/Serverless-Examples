require 'uri'
require 'openssl'
require 'net/http'
require 'json'


def send_openwhisk_function_request
  url = URI("https://openwhisk.ng.bluemix.net/api/v1/web/rcamden%40us.ibm.com_My%20Space/default/shootout.http")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Post.new(url, 'Content-Type'=>'application/json')
  request["cache-control"] = 'no-cache'
  request.body = '{"message":"OpenWhisk"}'
  response = http.request(request)
  puts response.read_body
end

def run_serverless_shootout(timed = false)
  aws_file = File.open('ow_results.txt','w+')
  (1..100000).each do |val|
    begin
      puts (val/100.0).to_s + '% complete'
      aws_start = Time.now
      send_openwhisk_function_request
      aws_finish = Time.now
      aws_file.puts "RUN #{val}: #{aws_finish-aws_start}"
      # Lather, Rinse, Repeat for Google and Microsoft
      sleep (1+rand(1200)) if timed || val%100 == 0
    rescue Net::OpenTimeout => e
      # Error handling omitted
    end
  end
  aws_file.close
end

run_serverless_shootout