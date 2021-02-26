import mongoose from 'mongoose'

const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

//TODO: lockdown mongoDB
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD

const CONNECTION_URL = `mongodb://${dbUrl}/${dbName}`
//const CONNECTION_URL = `mongodb://${dbUsername}:${dbPassword}@${dbUrl}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongo has connected successfully')
})
mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
    console.log('Mongo connection has an error', error)
    mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongo connection is disconnected')
})