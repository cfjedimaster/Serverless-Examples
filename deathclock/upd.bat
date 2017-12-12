del dc.zip
7z a -r dc.zip .
wsk action update deathclock -a raw-http true -a web-export true --kind nodejs:6 .\dc.zip
