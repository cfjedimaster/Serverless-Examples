#!/bin/bash
zip -rq temp.zip main.js package.json node_modules
wsk action update watson/tone --kind nodejs:6 temp.zip
rm temp.zip
