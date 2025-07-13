import Product from "@/models/Product";
import { getAuth, User } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
 import { inngest } from "@/config/inngest";
export async function POST(request){
    try{ const {userId}=getAuth(request);
      const {address,items}=await request.json();
      if(!address || items.length==0){
        return NextResponse.json({success:false,message:'Invalid Data'});
      }
      const amount=await items.reduce(async(acc,item)=>{
         const product=await Product.findById(item.product);
         return acc+product.offerPrice*item.quantity;
      },0)
      await inngest.send({
        name:'order/created',
        data:{
            userId,address,items,date:Date.now(),amount:amount+Math.floor(amount*0.02),
        }
      })
      //clear  user cart
      const user=await User.findById(userId);
      user.cartItems={}
      await user.save();
      return NextResponse.json({success:true,message:"order placed"});
    }catch(err){
        return NextResponse.json({success:false,message:err.message});
    }
}