import React, { useState } from 'react'
import BtnItem from '../../components/items/itemBtn/BtnItem';
import { useCart } from '../../context/CartContext';
import { Alert, Box, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [checkCart, setCheckCart] = useState()
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useCart();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const btnCheckOut = () => {
        if (cartItems.length === 0) {
            setCheckCart("Giỏ hàng đang trống");
            return;
        }
        localStorage.removeItem("checkoutItem");
        navigate('/checkout');
    }
    setTimeout(() => setCheckCart(""), 2000)
    return (
        <>
            {checkCart && (
                <div className="fixed top-25 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <Alert severity="success" className="shadow-lg">
                        {checkCart}
                    </Alert>
                </div>
            )}
            <Fade
                in={true}
                timeout={1500}
            >
                <Box>
                    <div className='py-7'>
                        <div className="grid wide">
                            <h2 className="text-3xl text-center font-bold mb-8">Shopping Cart</h2>

                            <div className="w-full flex flex-col lg:flex-row gap-8">
                                <div className="flex-1 bg-white rounded-lg shadow p-6">
                                    {cartItems.length > 0 ? (
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="pb-2">Product</th>
                                                    <th className="pb-2 text-center">Quantity</th>
                                                    <th className="pb-2 text-right">Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((item) => (
                                                    <tr key={item.id} className="border-b">
                                                        <td className="py-4 flex items-center gap-4">
                                                            <img
                                                                src={item.thumbnail}
                                                                alt={item.title}
                                                                className="w-16 h-16 object-cover"
                                                            />
                                                            <div>
                                                                <p className="font-semibold">{item.title}</p>
                                                                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="flex justify-center items-center gap-2">
                                                                <BtnItem
                                                                    classCss="px-2 border rounded cursor-pointer"
                                                                    title="-"
                                                                    onClick={() => decreaseQuantity(item.id)}
                                                                />
                                                                <span>{item.quantity}</span>
                                                                <BtnItem
                                                                    classCss="px-2 border rounded cursor-pointer"
                                                                    title="+"
                                                                    onClick={() => increaseQuantity(item.id)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="text-right font-semibold">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </td>
                                                        <td className="text-right">
                                                            <BtnItem
                                                                classCss="text-red-500 hover:text-red-700 cursor-pointer"
                                                                title="Xóa"
                                                                onClick={() => removeFromCart(item.id)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-center text-gray-600">Giỏ hàng đang trống.</p>
                                    )}
                                </div>
                                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
                                    <div className="bg-gray-100 p-4 rounded mb-4">
                                        <p className="text-sm " style={{ color: totalPrice >= 100 ? "red" : "black" }}>
                                            {totalPrice >= 100
                                                ? "Xin chúc mừng, bạn đã được miễn phí vận chuyển!"
                                                : `Mua thêm $${(100 - totalPrice).toFixed(2)} để được miễn phí vận chuyển.`}
                                        </p>
                                        <div className="w-full h-2 bg-green-200 rounded-full mt-2">
                                            <div
                                                className="h-2 bg-green-500 rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((totalPrice / 100) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="text-sm text-gray-600 block mb-1">Coupon</label>
                                        <input
                                            type="text"
                                            className="w-full border px-3 py-2 rounded focus:outline-none"
                                            placeholder="Coupon code"
                                        />
                                    </div>

                                    <div className="text-right mb-4">
                                        <p className="text-sm text-gray-600">Total:</p>
                                        <p className="text-xl font-bold text-gray-800">
                                            ${totalPrice.toFixed(2)}
                                        </p>
                                    </div>

                                    <BtnItem
                                        title="Check Out"
                                        classCss="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
                                        onClick={btnCheckOut}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Fade>
        </>
    )
}

export default ShoppingCart
