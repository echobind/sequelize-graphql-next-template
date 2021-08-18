const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	dbname: process.env.DATABASE_NAME,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
}