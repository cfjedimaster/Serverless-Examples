#!/bin/bash
zip -rq temp.zip verifier.js package.json node_modules
wsk action update alexa/verifier --kind nodejs:6 temp.zip
rm temp.zip
