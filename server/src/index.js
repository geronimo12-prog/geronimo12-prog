import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express(); app.use(cors()); app.use(express.json())
const propertySchema = new mongoose.Schema({ title:String, type:String, zone:String, rooms:Number, price:Number, location:String, description:String, image:String }, {timestamps:true})
const inquirySchema = new mongoose.Schema({ name:String, email:String, message:String, propertyId:String }, {timestamps:true})
const userSchema = new mongoose.Schema({ email:String, password:String, role:{type:String,default:'user'} }, {timestamps:true})
const Property = mongoose.model('Property', propertySchema)
const Inquiry = mongoose.model('Inquiry', inquirySchema)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sf_inmobiliaria').catch(()=>console.log('Mongo not connected'))
app.get('/api/health', (_,res)=>res.json({ok:true}))
app.get('/api/properties', async (_,res)=>res.json(await Property.find().sort({createdAt:-1})))
app.post('/api/properties', async (req,res)=>res.status(201).json(await Property.create(req.body)))
app.put('/api/properties/:id', async (req,res)=>res.json(await Property.findByIdAndUpdate(req.params.id, req.body, {new:true})))
app.delete('/api/properties/:id', async (req,res)=>res.json(await Property.findByIdAndDelete(req.params.id)))
app.get('/api/inquiries', async (_,res)=>res.json(await Inquiry.find().sort({createdAt:-1})))
app.post('/api/inquiries', async (req,res)=>res.status(201).json(await Inquiry.create(req.body)))
app.listen(4000, ()=>console.log('API on :4000'))
