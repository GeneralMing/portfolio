#!/bin/bash
sudo apt update -y
sudo apt upgrade -y
sudo apt install nginx -y
sudo mv ./default /etc/nginx/sites-available/default
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -n --agree-tos --email advaithkrishna7@gmail.com -d generalming.me
cd portfolio/backend
npm install
npm start &
cd ../frontend
npm install
npm start &