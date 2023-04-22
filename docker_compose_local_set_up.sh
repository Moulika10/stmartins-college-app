#!/bin/bash
set -e 

npm install --packge-only
npm install -g newman


echo $NODE_ENV

## Run migration Scripts and seeders
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Build, Run test & Start the Application
if [[ "$NODE_ENV" =~ .*"pipeline".* ]]; then
    npm run build
    npm run lint && npm run test
    npm run start& 
    npm run test:postman:run
    npm run test:postman:results
else
    npm run build
    npm run start 
fi


