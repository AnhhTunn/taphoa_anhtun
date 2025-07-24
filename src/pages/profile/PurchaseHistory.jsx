import { Box, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';

const PurchaseHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
        setOrders(stored);
    }, []);
    
    return (
        <>
            <Fade
                in={true}
                timeout={1000}
            >
                <Box>
                    <div className="p-3">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lịch sử mua hàng</h2>

                        {orders.length === 0 ? (
                            <div className="text-gray-500">Bạn chưa có đơn hàng nào.</div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="border rounded-xl p-4 shadow-sm bg-white">
                                        <div className="flex justify-between items-center border-b pb-2 mb-3">
                                            <div>
                                                <p className="font-semibold text-gray-700">Mã đơn: {order.id}</p>
                                                <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                                            </div>
                                            <div className="text-sm text-green-600 font-medium">{order.status}</div>
                                        </div>

                                        <div className="space-y-2">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="grid items-center text-sm text-gray-700 border-b pb-2">
                                                    <div className='row'>
                                                        <div className='col l-3 '>
                                                            <img src={item.avatar} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                        </div>
                                                        <div className='col l-3' style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span>{item.name}</span>
                                                        </div>
                                                        <div className='col l-3 text-center' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <span>{item.quantity}</span>
                                                        </div>
                                                        <div className='col l-3 text-right'>
                                                            <span>{item.price.toLocaleString()}₫</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-right font-semibold text-gray-800 mt-3">
                                            Tổng: {order.total.toLocaleString()}₫
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Box>
            </Fade>
        </>
    );
};

export default PurchaseHistory;
