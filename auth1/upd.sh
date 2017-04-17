#!/bin/bash
rm jwt.zip
zip -rq jwt.zip creds.json jwtverify.js package.json node_modules
wsk action update secblog1/jwtverify --kind nodejs:6 jwt.zip
