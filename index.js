const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotEnv=require('dotenv')
const bodyParser=require('body-parser')
const vendorRoutes=require('./routes/vendorRoutes')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')

const path=require('path')

const PORT=5500
dotEnv.config()


mongoose.connect(process.env.URI)
.then(()=>{
    console.log("Database connected Successfully") //promise
})
.catch((error)=>{
    console.log("Error",error); //promise
    
})

app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))


app.listen(PORT,()=>{
    console.log(`Server started and running Successfully at ${PORT}`)

})