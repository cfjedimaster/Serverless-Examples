#!/bin/bash
zip -rq icalget.zip get.js package.json node_modules
wsk action update ical/get --kind nodejs:6 icalget.zip
rm icalget.zip
