import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
export async function GET(request){
    try{ const {userId}=getAuth(request);
      const isSeller=await authSeller(userId);
      if(!isSeller){return NextResponse.json({success:false,message:"not authorized"})}
      await connectDB();
      
      const orders=await Order.find({}).populate('address items.product');
       console.log("orders form seller orders->",orders);
      return NextResponse.json({success:true,orders});

    }catch(err){
   return NextResponse.json({success:false,message:err.message});
    }
}