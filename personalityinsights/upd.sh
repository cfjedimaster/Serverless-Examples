#!/bin/bash
zip -rq temp.zip pi.js package.json node_modules
wsk action update watson/pi --kind nodejs:6 temp.zip
rm temp.zip
