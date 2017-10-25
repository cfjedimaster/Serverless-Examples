#!/bin/bash
#zip -rq temp.zip getHoroscope.js adjectives.json nouns.json package.json

zip -rq temp.zip getHoroscope.js adjectives.json nouns.json skill.js package.json

wsk action update tbshoroscope/doHoroscope --kind nodejs:6 temp.zip --web true

wsk action update tbshoroscope/getHoroscope --sequence "/rcamden@us.ibm.com_My Space/alexa/verifier",tbshoroscope/doHoroscope --web raw 

rm temp.zip
