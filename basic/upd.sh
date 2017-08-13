#!/bin/bash
zip -rq basic.zip basic.js test.js package.json
wsk action update basic/basic --kind nodejs:6 basic.zip --web true
rm basic.zip
