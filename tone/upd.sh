<<<<<<< HEAD
#!/bin/bash
wsk action update tone --kind nodejs:6 main.js
=======
#!/bin/bash
zip -rq temp.zip main.js package.json node_modules
wsk action update watson/tone --kind nodejs:6 temp.zip
rm temp.zip
>>>>>>> 148ed1a53925d60adfe2eebbea16bf14a9591922
