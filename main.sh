#!/bin/sh
root="sequelize-graphql-next-template"
cwd=$(pwd)
echo "What is the name of your app?"
read name

# initialize nextjs app and install dependencies for apollo, graphql, sequelize
npx create-next-app $name
cd $cwd/$name
npm i @apollo/client apollo-server-micro dotenv graphql sequelize tedious
npm i -D sequelize-cli

# copy files over
echo "tell me about your mssql database, what is the database name?"
read dbName
echo "DATABASE_NAME=$dbName" >> .env

echo "What is the database username?"
read dbUsername
echo "DATABASE_NAME=$dbUsername" >> .env

echo "What is the database password?"
read dbPassword
echo "DATABASE_NAME=$dbPassword" >> .env

echo "Last question, what is the database host?"
read dbHost
echo "DATABASE_NAME=$dbHost" >> .env
echo ".env" >> .gitignore

cp $cwd/$root/.env.template $cwd/$name
cp $cwd/$root/db.config.js $cwd/$name
cp $cwd/$root/.sequelizerc $cwd/$name
cd $cwd/$name
npx sequelize init
cp $cwd/$root/db/config/config.js $cwd/$name/db/config/config.js
cp -R $cwd/$root/graphql $cwd/$name
cp $cwd/$root/pages/api/graphql.js $cwd/$name/pages/api
cp $cwd/$root/pages/api/rest.js $cwd/$name/pages/api
cp $cwd/$root/pages/_app.js $cwd/$name/pages/_app.js

echo "project created, cd into $name and run npm run dev"