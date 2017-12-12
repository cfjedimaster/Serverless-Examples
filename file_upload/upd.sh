#!/bin/bash
zip -rq filetest1.zip filetest1.js package.json node_modules
wsk action update safeToDelete/filetest1 --kind nodejs:6 filetest1.zip --web raw
rm filetest1.zip
