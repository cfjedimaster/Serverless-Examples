del search.zip
copy package.search.json package.json
7z a -r search.zip search.js package.json node_modules/*
wsk action update elasticsearch/search --kind nodejs:6 .\search.zip

del create.zip
copy package.create.json package.json
7z a -r create.zip create.js package.json node_modules/*
wsk action update elasticsearch/create --kind nodejs:6 .\create.zip

del bulk.zip
copy package.bulk.json package.json
7z a -r bulk.zip bulk.js package.json node_modules/*
wsk action update elasticsearch/bulk --kind nodejs:6 .\bulk.zip
