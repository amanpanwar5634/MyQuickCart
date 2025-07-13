import Address from "@/models/Address";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
export async function GET(request){
    try{  const {userId}=getAuth(request);
    
    const addresses=await Address.find({userId});
     
return NextResponse.json({success:true,addresses});
    }catch(err){
        return NextResponse.json({success:true,message:err.message})
    }
}