import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/config/db";
export async function GET(request){
    try{ const {userId}=getAuth(request);
    await connectDB();
           const user=User.findById(userId);
           if(!user){return NextResponse.json({succes:false,message:"not authenticated"})}
           const {cartItems}=user;
           return NextResponse.json({success:true,cartItems});
    }
    catch(err){
        return NextResponse.jons({success:false,message:err.message});
    }
}