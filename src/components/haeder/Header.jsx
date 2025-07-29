import React, { useState } from 'react'
import logo from '../../assets/images/logo.webp'
import ico_search from '../../assets/images/ico_search.png'
import ico_user from '../../assets/images/ico_user.png'
import ico_heart from '../../assets/images/ico_heart.png'
import ico_bag from '../../assets/images/ico_bag.png'
import Menu from './Menu'
import { NavLink, useNavigate } from 'react-router-dom'
import BtnItem from '../items/itemBtn/BtnItem'
import { Avatar, Box, Fade, Stack } from '@mui/material'
import { useCart } from '../../context/CartContext'
const Header = () => {
    const [txtSearch, setTxtSearch] = useState("")
    const navigate = useNavigate()
    const getTxtSearch = (e) => {
        setTxtSearch(e.target.value)
    }
    const btnSearch = () => {
        if (txtSearch) {
            navigate(`/products/search?q=${encodeURIComponent(txtSearch)}`);
            setTxtSearch("");
        }
    }
    const stringAvatar = (name) => ({
        children: name.split(' ').map(n => n[0]).join('').toUpperCase()
    });
    const account = localStorage.getItem("user");
    let getUser = null;
    try {
        getUser = account ? JSON.parse(account) : null;
    } catch (error) {
        console.error("Lỗi parse user:", error);
    }
    const userName = getUser?.userName || "";
    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("purchaseHistory")
        localStorage.removeItem("checkoutItem");
        window.location.href = "/";
    }
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    let shoppingCart=account?"cart":"login"
    return (
        <>
            <header className="header sticky top-0 z-1000 bg-white">
                <div className='grid wide'>
                    <Fade
                        in={true}
                        timeout={1500}
                    >
                        <Box>
                            <div className='row no-gutters pt-6 pb-6'>
                                <div className='col l-2 c-3'>
                                    <h1 className="flex-shrink-0 h-full flex items-center">
                                        <NavLink to={""} className="block max-w-[130px]" ><img className="max-w-full" src={logo} alt="Darion" /></NavLink>
                                    </h1>

                                </div>
                                <div className="col l-4 c-6">
                                    <div className="relative w-full search-mobile">
                                        <input
                                            type="text"
                                            name="txtSearch"
                                            onChange={getTxtSearch}
                                            id="txtSearch"
                                            value={txtSearch}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') btnSearch();
                                            }}
                                            placeholder="Search..."
                                            className="w-full h-10 px-4 pr-10 border border-black rounded-full focus:outline-none focus:ring-1 focus:ring-black"
                                        />
                                        <BtnItem
                                            classCss=" l-12 c-0 bg-gray-800 absolute p-3 h-full right-0  rounded-r-full top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={btnSearch}
                                            title={<img src={ico_search} alt="Search" className="w-full h-full filter invert" />}
                                        />
                                    </div>
                                </div>
                                <div className='col l-5 c-0'>
                                    <div className='flex items-center h-full justify-center'>
                                        <Menu />
                                    </div>
                                </div>
                                <div className='col l-1 c-3'>
                                    <div className='flex items-center justify-end gap-4 h-full'>
                                        {!account ? (
                                            <div className="relative inline-block group">
                                                <div className="flex flex-col items-start">
                                                    <img
                                                        src={ico_user}
                                                        alt="User"
                                                        className="w-5 h-5 cursor-pointer"
                                                    />
                                                    <div className="absolute -left-10 mt-6 w-40 bg-white shadow-md rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                                        <ul className="py-2 text-sm text-gray-700">
                                                            <li>
                                                                <NavLink to={"login"} className="block px-4 py-2 hover:bg-gray-100">Đăng nhập</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink className="block px-4 py-2 hover:bg-gray-100">Đăng ký</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink className="block px-4 py-2 hover:bg-gray-100">Trợ giúp</NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative inline-block group">
                                                <div className="flex flex-col items-start cursor-pointer">
                                                    <Stack direction="row" spacing={2} >
                                                        <Avatar
                                                            {...stringAvatar(`${userName}`)}
                                                            sx={{ width: 25, height: 25, fontSize: 12 }}
                                                        />
                                                    </Stack>
                                                    <div className="absolute -left-10 mt-6 w-40 bg-white shadow-md rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                                        <ul className="py-2 text-sm text-gray-700">
                                                            <li className='cursor-pointer'>
                                                                <NavLink to={"profile"} className="block px-4 py-2 hover:bg-gray-100">Thông tin tài khoản</NavLink>
                                                            </li>
                                                            <li className='cursor-pointer'>
                                                                <NavLink to={"profile/purchaseHistory"} className="block px-4 py-2 hover:bg-gray-100">Đơn hàng</NavLink>
                                                            </li>
                                                            <li className='cursor-pointer'>
                                                                <NavLink className="block px-4 py-2  hover:bg-gray-100">Hỗ trợ</NavLink>
                                                            </li>
                                                            <li className='cursor-pointer'>
                                                                <BtnItem
                                                                    title="Đăng xuất"
                                                                    classCss="block px-4 text-left py-2 w-full hover:bg-gray-100 cursor-pointer"
                                                                    onClick={handleLogout}
                                                                ></BtnItem>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <NavLink to="#" className="relative">
                                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                0
                                            </span>
                                            <img className="w-5 h-5" src={ico_heart} alt="Heart" />
                                        </NavLink>

                                        <NavLink to={shoppingCart} className="relative">
                                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                {totalItems}
                                            </span>
                                            <img className="w-5 h-5" src={ico_bag} alt="Bag" />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </div>
            </header>
        </>
    )
}

export default Header
