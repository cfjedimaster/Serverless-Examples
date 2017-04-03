del search.zip
7z a -r search.zip search.js package.json node_modules/*
wsk action update elasticsearch/search --kind nodejs:6 .\search.zip
