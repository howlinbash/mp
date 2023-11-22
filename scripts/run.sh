#!/bin/sh
echo 'run migration'
npm run db:push
echo 'populate database'
npm run db:load
echo 'start server'
node server.js
