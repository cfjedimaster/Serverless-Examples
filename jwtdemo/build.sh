#!/bin/bash
cp package.auth.json package.json
zip -rq code.zip creds.json auth.js package.json node_modules
wsk action update safeToDelete/auth --kind nodejs:8 code.zip --web true
rm code.zip
wsk action get safeToDelete/auth --url

cp package.verify.json package.json
zip -rq code.zip creds.json verify.js package.json node_modules
wsk action update safeToDelete/verify --kind nodejs:8 code.zip --web true
rm code.zip
wsk action get safeToDelete/verify --url

wsk action update safeToDelete/helloworld helloworld.js
wsk action update --sequence safeToDelete/safeHelloWorld safeToDelete/verify,safeToDelete/helloworld --web true
wsk action get safeToDelete/safeHelloWorld --url