import mongoose from "mongoose"

const connection =async()=>{
    return await mongoose.connect(process.env.ecommerce).then(()=> console.log("connect success to DB")).catch((err)=>{
        console.log("error with connection to DB",err)
    })
} 
export default connection;