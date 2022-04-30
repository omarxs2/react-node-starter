#!/bin/bash

# Install node.js
sudo apt-get update
sudo apt-get install nodejs -y

# Install nodemon
# sudo npm install nodemon -g

# Install forever module 
# https://www.npmjs.com/package/forever
sudo npm install pm2 -g

# Clean working folder
# sudo find /home/ubuntu/test -type f -delete