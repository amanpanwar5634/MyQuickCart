import connectDB from "@/config/db";
import { getAuth} from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        console.log("inside the api/user/data");
 const {userId}=getAuth(request);
 await connectDB(); 
  const user=await User.findById(userId);
 if(!user) return NextResponse.json({success:false,message:"User Not Found!"});
 return NextResponse.json({success:true,user});
    }catch(err){
return NextResponse.json({success:false,message:err.message})
    }
}