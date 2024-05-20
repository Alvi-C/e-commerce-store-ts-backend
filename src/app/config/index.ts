import dotenv from 'dotenv'

dotenv.config()

export default {
	port: process.env.PORT,
	database_url: process.env.MONGO_URI,
}
