const vendor = require('../Models/Vendor')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Vendor = require('../Models/Vendor')
const dotEnv=require('dotenv')

dotEnv.config()

const secretKey=process.env.WYN_key

const vendorRegister= async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const vendorEmail=await vendor.findOne({email}) //getting email and assigning email to the variable
        if (vendorEmail){
            return res.status(400).json("email already taken")
        }
        const hashedPassword= await bcrypt.hash(password,10) //hashing the password using bcrypt
         
        const newVendor=new vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();
        
        res.status(201).json({message:"vendor rgistered successfully"})
        console.log("Registered")

    } catch (error) {
        console.log("error",error)
        res.status(500).json({error:"Internal server error"})

    }

} 
const vendorLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const vendor=await Vendor.findOne({email})
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({error:"Invalid  details"})
        }

        const token=jwt.sign({vendorId:vendor._id}, secretKey,{expiresIn:'1h'})
        
        res.status(200).json({success:"Login Successful",token})
        console.log(email,"this is token",token)
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log('error',error)

    }
}

const getAllvendors=async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm');

        res.json({vendors})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}

const getvendorById=async(req,res)=>{
    const vendorId=req.params.id;

    try {
        const vendor= await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
    }
}

module.exports={vendorRegister, vendorLogin, getAllvendors, getvendorById }    