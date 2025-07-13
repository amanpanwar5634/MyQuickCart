import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
 import { inngest } from "@/config/inngest";
import Order from "@/models/Order";
export async function POST(request){
    try{ const {userId}=getAuth(request);
    console.log("userid->",userId);
      const {address,items}=await request.json();
      if(!address || items.length==0){
        return NextResponse.json({success:false,message:'Invalid Data'});
      }
      const amount=await items.reduce(async(acc,item)=>{
         const product=await Product.findById(item.product);
         return await acc+product.offerPrice*item.quantity;
      },0)
      console.log("amount->",amount);
      await inngest.send({
        name:'order/created',
        data:{
            userId,address,items,amount:amount+Math.floor(amount*0.02),date:Date.now()
        }
      })
      console.log("after the inngest");
      //clear  user cart
      const user=await User.findById(userId);
      user.cartItems={};
      await user.save();
      const orders=await Order.find({});
      console.log("orders->",orders);
      return NextResponse.json({success:true,message:"order placed"});
    }catch(err){
        return NextResponse.json({success:false,message:err.message});
    }
}