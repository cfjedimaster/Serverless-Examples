#!/bin/bash
zip -rq temp.zip getHoroscope.js adjectives.json nouns.json package.json
wsk action update tbshoroscope/getHoroscope --kind nodejs:6 temp.zip --web true
rm temp.zip
