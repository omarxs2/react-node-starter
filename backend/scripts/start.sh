# Stop all servers and start the server as a daemon
pm2 stop index
cd /home/ubuntu/backend
yarn
pm2 start index


