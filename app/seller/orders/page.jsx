'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, user, getToken } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/order/seller-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
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
    if (user) fetchSellerOrders();
  }, [user]);

  return (
    <div className="flex-1 min-h-screen overflow-auto flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-xl font-bold text-gray-800">All Orders</h2>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto animate-fade-in">
            <table className="w-full border border-gray-300 rounded-md shadow-sm bg-white">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="text-left p-3">Product(s)</th>
                  <th className="text-left p-3">Shipping Address</th>
                  <th className="text-left p-3">Amount</th>
                  <th className="text-left p-3">Order Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-t border-gray-300 hover:bg-gray-100 transition duration-200">
                    <td className="p-3 flex items-start gap-3">
                      <Image className="w-12 h-12 object-cover" src={assets.box_icon} alt="box_icon" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.items.map((item) => `${item.product.name} x ${item.quantity}`).join(", ")}
                        </p>
                        <p className="text-xs text-gray-500">Items: {order.items.length}</p>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <p className="font-medium">{order.address.fullName}</p>
                      <p>{order.address.area}</p>
                      <p>{`${order.address.city}, ${order.address.state}`}</p>
                      <p>{order.address.phoneNumber}</p>
                    </td>
                    <td className="p-3 font-semibold text-gray-800">
                      {currency}{order.amount}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      <p>Method: COD</p>
                      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                      <p>Payment: Pending</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-4 animate-fade-in">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 space-y-3 border border-gray-200">
                <div className="flex items-start gap-3">
                  <Image className="w-10 h-10 object-cover" src={assets.box_icon} alt="box_icon" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {order.items.map((item) => `${item.product.name} x ${item.quantity}`).join(", ")}
                    </p>
                    <p className="text-xs text-gray-500">Items: {order.items.length}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700">
                  <p className="font-semibold">Shipping Address</p>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.area}</p>
                  <p>{`${order.address.city}, ${order.address.state}`}</p>
                  <p>{order.address.phoneNumber}</p>
                </div>

                <div className="text-sm text-gray-700">
                  <p className="font-semibold">Amount</p>
                  <p>{currency}{order.amount}</p>
                </div>

                <div className="text-sm text-gray-700">
                  <p className="font-semibold">Order Details</p>
                  <p>Method: COD</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p>Payment: Pending</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
