'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const MyOrders = () => {
    const { currency, getToken, router, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get("/api/order/list", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("data from my order->", data);
            if (data.success) {
                setOrders(data.orders);
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        if (user) fetchOrders();
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen bg-gray-50">
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold mt-6 text-gray-800">My Orders</h2>
                    {loading ? (
                        <Loading />
                    ) : (
                        <motion.div
                            className="max-w-5xl border-t border-gray-300 text-sm space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {orders.map((order, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col md:flex-row gap-5 justify-between p-5 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-300"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex-1 flex gap-5 max-w-80">
                                        <Image
                                            className="w-16 h-16 object-contain"
                                            src={assets.box_icon}
                                            alt="box_icon"
                                        />
                                        <div className="flex flex-col gap-2 text-gray-700">
                                            <span className="font-medium text-base">
                                                {order.items.map((item) =>
                                                    item.product.name + ` x ${item.quantity}`
                                                ).join(", ")}
                                            </span>
                                            <span className="text-xs">Items: {order.items.length}</span>
                                        </div>
                                    </div>

                                    <div className="text-gray-600 text-sm">
                                        <p className="font-medium text-gray-800">{order.address.fullName}</p>
                                        <p>{order.address.area}</p>
                                        <p>{`${order.address.city}, ${order.address.state}`}</p>
                                        <p>{order.address.phoneNumber}</p>
                                    </div>

                                    <div className="text-gray-800 font-semibold text-base my-auto">
                                        {currency}{order.amount}
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        <p>Method: <span className="text-gray-800">COD</span></p>
                                        <p>Date: <span className="text-gray-800">{new Date(order.date).toLocaleDateString()}</span></p>
                                        <p>Payment: <span className="text-red-500 font-medium">Pending</span></p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
