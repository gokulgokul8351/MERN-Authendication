const mongoose = require('mongoose')
const dotEnv = require('dotenv').config()


const DB_URL = process.env.DB

const dbConnection = async () => {

    try {
        
        await mongoose.connect(DB_URL)
        console.log('Database connected successfully')

    } catch (error) {
        console.log(`Error connecting to database: ${error.message}`);
        
    }

}

module.exports = dbConnection