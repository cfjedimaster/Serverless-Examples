del randomcat3.zip
7z a -r randomcat3.zip .
wsk action update randomcat2 -a raw-http true -a web-export true --kind nodejs:6 .\randomcat3.zip
