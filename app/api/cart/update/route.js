import connectDB from "@/config/db";
import { getAuth} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User";
export async function POST(request){
    try{ const {userId}=getAuth(request);
    const {cartData}=await request.json();
    await connectDB();
const user=await User.findById(userId);
    user.cartItems=cartData;
   await user.save();
   return NextResponse.json({success:true});
    }catch(err){
        return NextResponse.json({success:false,message:err.message});
    }
}