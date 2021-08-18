## What is this?
- you want to quickly spin up a new nextjs app that has an api layer with graphql, sequelize, and mssql

## How do I use this
	- clone this repo
	- you'll need node@16.x.x installed
	- from the parent directory, run `bash sequelize-graphql-next-template/main.sh`

## What main.sh does
- create a new app with nextjs
	- `npx create-next-app [app name]`
- set up env variables
	- copy the .env.template from this repo into your nextjs app
	- `cp .env.template ../[app name]/.env`
	- provide the values to those env variables, you'll find them from your mssql database
	- you'll also want to copy that .env.template into another .env.template file in your new app so that other contributors will know what they need to set up
	- git ignore the .env file
- install the dependencies that are in this package.json
- set up sequelize:
	- `cp db.config.js ../[your app]`
	- `cp .sequelizeerc ../[your app]`
	- `npx sequelize init`
	- `cp ./db/config/config.js ../[your app]/db/config/config.js`
		- you'll probably want to modify this file for your other environments when you start deploying
	- `cp ./db/models/index.js ../[your app]/db/models/index.js
- set up graphql
	- `cp ./graphql -R ../[your app]/graphql`
	- `cp ./pages/api/graphql.js ../[your app]/pages/api`
	- `cp ./pages/api/rest.js ../[your app]/pages/api`
	- `cp ./pages/_app.js ../[your app]/pages/_app.js`
- run the app and check the state of things
	- `npm run dev`,
		- open browser to localhost:3000, you should see the nextjs sample page
		- navigate to `/api/rest`, you should see some dummy json content
		- navigate to `/api/graphql`, you should see the apollographql studio with a dummy query and dummy mutation

## Building your app, api driven first
- generate a model with sequelize
	- example: `npx sequelize model:create --name User --attributes firstName:stringlastName:string,email:string`
		- name field is the name of the table
		- attributes isn't required, but you can specify the columns and their types
		- after you've generated you're table, make any changes in the `db/models/[tablename].js`, explore [ways](https://sequelize.org/v5/manual/models-definition.html) to modify the table's columns
	- add associations
	- the cli script that created the model also created a migration that adds the table to the database
	- this creates a file with a time stamp and the name of the migration in the db/migrations directory
	- `npx sequelize db:migrate`
- generate a seed for your model
	- `npx sequelize seed:generate --name users`
	- find the seed file and fill it out with some data
	- `npx sequelize db:seed:all`
	- modify /api/test.js so that it calls `db.user.findAll()` and returns the results to the page and check `/api/rest`, and you should see your seed data
- graphql
	- first define your User type in graphql/schema/index.js and add it to the Query type
	- then define your mutations
		- create a file that matches the name of your model in graphql/resolvers, in our case, it would be user.js. You should export an object that has a queries field and a mutations field. Each of those two fields should contain an object with a set of async functions that invoke methods from sequelize. Remember the graphql resolver [arguments](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments), you can access the sequelize methods from context[model name], and your model names will match the filel name in db/models/*.js
		- now in /graphql/resolvers/index.js, import your resolvers, and spread each set of resolver functions into their approapriate slot
		- last, be sure to add the mutations and queryies to graphql/schema/index.js
		- now check localhost:3000/api/graphql and you should be able to run your queries and mutations
- from there, you can start creating your views with react
- to use your graphql endpoint, take a look at [@apollo/client](https://www.apollographql.com/docs/react/)

## additional links
- [sequelize-cli](https://github.com/sequelize/cli