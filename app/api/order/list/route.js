import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Address from "@/models/Address";
import Product from "@/models/Product";
import connectDB from "@/config/db";
export async function GET(request){
    try{ const {userId}=getAuth(request);
    await connectDB();
    Address.length;
    Product.length;
    
    const orders=await Order.find({userId}).populate('address items.product');
   
    return NextResponse.json({success:true,orders});
    }catch(err){
    return NextResponse.json({success:true,message:err.message});
    }
}