//Entrypoint and primary config for server
import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 

mongoose.Promise = global.Promise

//Connect to database
mongoose.connect(config.mongoUri, { useNewUrlParser: true,
//useCreateIndex: true, 
useUnifiedTopology: true } )

 .then(() => {
console.log("Connected to the Marketmingle database!");
})

mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})


app.get("/", (req, res) => {
res.json({ message: "Welcome to MarketMingle!" });

});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
console.info('URI %s.', config.mongoUri) 
})
