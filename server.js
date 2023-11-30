//Entrypoint and primary config for server
import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';



// Get the __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, 'public')));





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
