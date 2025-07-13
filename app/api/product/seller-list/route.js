import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(request){
    try{const {userId}=getAuth(request);
    console.log("inside the seller list function");
    console.log("user if form the seller-list->",userId);
    const isSeller=authSeller(userId);
    if(!isSeller){return NextResponse.json({success:false,message:"not authorized"});}
    await connectDB();
    const products=await Product.find({});
    return NextResponse.json({success:true,products});
    }catch(err){
return NextResponse.json({success:false,message:err.message});
    }
}