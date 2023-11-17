#!/bin/sh
echo 'run migration'
npm run db:push
echo 'start server'
node server.js
