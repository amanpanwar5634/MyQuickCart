import { Inngest } from "inngest";
import { connection } from "mongoose";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });
//ingest function to store the usert data in the datanase
export const syncUserCreation=inngest.createFunction(
    {id:'sync-user-from-clerk'},
    {event:'clerk/user.created'},
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name +''+last_name,
           imageUrl: image_url
        }
        await connectDB();
        await User.create(userData);
    }
)
//inngest function to update usr data in th edatabaae
export const syncUserUpdation=inngest.createFunction(
    {id:'update-user-from-clerk'},
    {event:'clerk/user.updated'},
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name +''+last_name,
           imageUrl: image_url
        }
        await connectDB();
        await User.findByIdAndUpdate(id,userData);
    }
) 
//inngest function to deleteuser data form the database
export const syncUserDeletion=inngest.createFunction(
    {id:'delete-user-from-clerk'},
    {event:'clerk/user.deleted'},
    async({event})=>{
        const {id }=event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)
//ingest function to create user's order in database
//we can maually use the create order function bu to handle the large ordr at a time inngest use will be useful
export const createUserOrder=inngest.createFunction(
    {id:'create-user-order',
        batchEvents:{maxSize:5,timeout:'5s'}
    },
    {event:'order/created'},
    async({events})=>{
        console.log("inside teh events controll fo createUserOrder");
        const orders=events.map((event)=>{
            return {
                userId:event.data.userId,
                address:event.data.address,
                items:event.data.items,
                amount:event.data.amount,
                date:event.data.date,
            }
        })
        console.log("inside the createUserOrder");
        await connectDB();
        await Order.insertMany(orders);
        const listorders=await Order.find({});
        console.log("listorders->",listorders);
        return {success:true,processed:orders.length};
    }
    
)
