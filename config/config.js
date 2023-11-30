
const config = {
     env: process.env.NODE_ENV || 'development', 
     port: process.env.PORT || 3000,
     jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
     mongoUri: process.env.MONGODB_URI || "mongodb+srv://marketmingle:6mODVrpJ96kUET5w@cluster0.dlwzq1d.mongodb.net/test?retryWrites=true&w=majority"||
    process.env.MONGO_HOST ||
     'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') +
     '/mernproject' 
     }
     export default config