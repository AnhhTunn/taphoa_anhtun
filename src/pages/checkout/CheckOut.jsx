import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext';
import qrCode from "../../assets/images/qrCode.png"
import BtnItem from '../../components/items/itemBtn/BtnItem';
import getApiProfile from '../../services/Account/ApiProfile';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
    const navigate = useNavigate();
    const [note, setNote] = useState('');
    const [payment, setPayment] = useState('cod');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const { cartItems, clearCart } = useCart();
    const FeeShip = 30.99;
    const totalPriceProducts = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = totalPriceProducts > 100 ? totalPriceProducts : totalPriceProducts + FeeShip
    const [orderSuccess, setOrderSuccess] = useState("");
    const handleOrder = () => {
        const newOrder = {
            id: 'HD' + Math.floor(Math.random() * 100000),
            date: new Date().toISOString().split('T')[0],
            total: totalPrice,
            status: 'Đang xử lý',
            items: cartItems.map(item => ({
                name: item.title,
                quantity: item.quantity,
                price: item.price,
                avatar: item.thumbnail
            }))
        };
        const existingOrders = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
        const updatedOrders = [newOrder, ...existingOrders];
        localStorage.setItem("purchaseHistory", JSON.stringify(updatedOrders));
        setOrderSuccess("Đặt hàng thành công");

        setTimeout(() => {
            clearCart();
            navigate("/profile/purchaseHistory");
        }, 500);
    };

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) {
            fetchProfile(user.id);
        }
    }, []);
    const fetchProfile = async (accountId) => {
        const data = await getApiProfile.getProfileByAccountId(accountId);
        if (data && data.length > 0) {
            setProfile(data[0]);
        }
    };
    const handleUpdate = async () => {
        if (!profile?.id) return;
        try {
            await getApiProfile.updateProfile(profile.id, profile);
            setOrderSuccess('Cập nhật thông tin thành công!');
            fetchProfile(profile.id);
        } catch (error) {
            console.log(error);
        }
    };
    setTimeout(() => setOrderSuccess(""), 5000);
    return (
        <>
            {orderSuccess && (
                <div className="fixed top-30 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <Alert severity="success" className="shadow-lg">
                        {orderSuccess}
                    </Alert>
                </div>
            )}
            <div className='py-10'>
                <div className="grid wide">
                    <div className='row'>
                        <div className="col l-6 m-tablet-12 c-12 bg-white rounded shadow p-6 space-y-6">
                            <h2 className="text-xl font-semibold mb-4">1. Thông tin giao hàng</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 py-5 px-10">
                                    <div className='flex items-center justify-between'>
                                        <label className="block text-sm font-medium">Họ tên: </label>
                                        <input name="name" value={profile?.name || " "} onChange={handleChange} className="w-4/5 border p-1 rounded" placeholder="Họ và tên" />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <label className="block text-sm font-medium">Số điện thoại: </label>
                                        <input name="phone" value={profile?.phone || " "} onChange={handleChange} className="w-4/5 border p-1 rounded" placeholder="Nhập số điện thoại" />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <label className="block text-sm font-medium">Tỉnh/Thành phố: </label>
                                        <input name="thanhPho" value={profile?.thanhPho || " "} onChange={handleChange} className="w-4/5 border p-1 rounded" placeholder="Tỉnh/thành phố" />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <label className="block text-sm font-medium">Quận/Huyện: </label>
                                        <input name="huyen" value={profile?.huyen || " "} onChange={handleChange} className="w-4/5 border p-1 rounded" placeholder="Quận/huyện" />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <label className="block text-sm font-medium">Địa chỉ: </label>
                                        <input name="diaChi" value={profile?.diaChi || " "} onChange={handleChange} className="w-4/5 border p-1 rounded" placeholder="Số nhà, tên đường" />
                                    </div>
                                    <span className="block font-medium">Loại địa chỉ</span>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="type" value="home" onChange={handleChange} />
                                            <span>Nhà riêng/Chung cư</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="type" value="company" onChange={handleChange} />
                                            <span>Cơ quan/Công ty</span>
                                        </label>
                                    </div>
                                    <div className="flex gap-4 mt-6 justify-center">
                                        <BtnItem
                                            title={"Cập nhật"}
                                            onClick={handleUpdate}
                                            classCss="bg-indigo-700 text-white px-6 py-2 rounded hover:bg-indigo-800 cursor-pointer"
                                        ></BtnItem>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mt-8">2. Chọn hình thức giao hàng</h2>
                            <label className="flex items-center gap-2 mt-2">
                                <input type="radio" checked readOnly />
                                <span>Giao hàng tiêu chuẩn</span>
                            </label>

                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-start mt-4 border-b pb-2">
                                    <img src={item.thumbnail} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex flex-col text-sm">
                                        <span className="font-medium">{item.title}</span>
                                        <span className="text-gray-500">SL: x{item.quantity}</span>
                                    </div>
                                    <div className="ml-auto font-semibold text-red-600">{item.price.toLocaleString()}₫</div>
                                </div>
                            ))}
                        </div>
                        <div className="col l-6 m-tablet-12 c-12 bg-white rounded shadow p-6 space-y-6">
                            <h2 className="text-xl font-semibold">3. Chọn hình thức thanh toán</h2>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={e => setPayment(e.target.value)} />
                                    <span>Thanh toán khi nhận hàng</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" value="bank" checked={payment === 'bank'} onChange={e => setPayment(e.target.value)} />
                                    <span>Thanh toán bằng chuyển khoản</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={e => setPayment(e.target.value)} />
                                    <span>Thanh toán bằng thẻ quốc tế Visa, Master</span>
                                </label>
                            </div>

                            {payment === 'bank' && (
                                <div className="bg-gray-100 p-4 rounded border text-center">
                                    <p className="mb-2 text-sm">Vui lòng quét mã bên dưới để thanh toán chuyển khoản</p>
                                    <img src={qrCode} alt="VietQR" className="mx-auto w-48" />
                                </div>
                            )}
                            {totalPriceProducts > 100 ? (
                                null
                            ) : (
                                <div className="pt-4 text-right text-lg font-bold text-black">
                                    Phí Ship: {FeeShip.toLocaleString()}₫
                                </div>
                            )}
                            <div className="border-t pt-4 text-right text-lg font-bold text-red-600">
                                Thành tiền: {(totalPriceProducts > 100 ? (totalPriceProducts) : (totalPriceProducts + FeeShip)).toLocaleString()}₫
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" onChange={handleChange} />
                                <label>Xuất hóa đơn công ty</label>
                            </div>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border p-3 rounded"
                                placeholder="Ghi chú"
                            ></textarea>
                            <BtnItem
                                onClick={handleOrder}
                                disabled={!profile}
                                classCss={`w-full text-white py-3 rounded text-lg font-semibold cursor-pointer ${profile ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                title={"ĐẶT HÀNG"}
                            >
                            </BtnItem>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout
