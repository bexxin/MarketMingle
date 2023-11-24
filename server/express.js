import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import methodoverride from 'method-override'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
//import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
import cartRoutes from './routes/cart.routes.js'

import path from 'path'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', productRoutes)
app.use('/', orderRoutes)
app.use('/', cartRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodoverride())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use((err, req, res, next) => {
if (err.name === 'UnauthorizedError') {
res.status(401).json({"error" : err.name + ": " + err.message}) 
}else if (err) {
res.status(400).json({"error" : err.name + ": " + err.message}) 
console.log(err)
} 
})
export default app
