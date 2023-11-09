const express=require('express');
const app = express();
app.use('/',function(req, res){
    res.send('Hello, Welcome to MarketMingle');
});
app.listen(3000);
console.log('Server is running at http://localhost:3000/');
module.exports=app;
