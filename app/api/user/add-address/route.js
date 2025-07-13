import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request){
    try{ const {userId}=getAuth(request);
    const {address}=await request.json();
    await connectDB();
    const newAddress=await Address.create({...address,userId});
    return NextResponse.json({success:true,newAddress,message:"Address added"});

    }catch(err){
        return NextResponse.json({success:false,message:err.message});
    }
}