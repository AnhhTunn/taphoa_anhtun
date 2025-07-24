import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import background from '../../assets/images/background.jpg';
import BtnItem from '../../components/items/itemBtn/BtnItem';
import getApiAccounts from '../../services/Account/ApiAccount';
import { Alert, Box, Fade } from '@mui/material';
import Header from '../../components/haeder/Header';
const Login = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
    })
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const [loginError, setLoginError] = useState("");
    const btnLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await getApiAccounts.getAccount();
            const found = data.find(
                (acc) =>
                    acc.userName === formData.userName &&
                    acc.passWord === formData.passWord
            );
            if (found) {
                localStorage.setItem("user", JSON.stringify(found));
                console.log("Đăng nhập thành công:", found);
                navigate("/")
            } else {
                setLoginError("Thông tin đăng nhập không chính xác");
            }
        } catch (error) {
            console.log("Lỗi khi kiểm tra đăng nhập:", error);
        }
    };
    setTimeout(() => setLoginError(""), 5000);
    return (
        <>
            {loginError && (
                <div className="fixed top-30 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <Alert severity="error" className="shadow-lg">
                        {loginError}
                    </Alert>
                </div>
            )}
            <Fade
                in={true}
                timeout={1500}
            >
                <Box>
                    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-110"
                            style={{
                                backgroundImage: `url(${background})`
                            }}
                        ></div>
                        <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
                            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Đăng nhập</h2>

                            <form className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Username"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        name='userName'
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Mật khẩu</label>
                                    <input
                                        onChange={handleChange}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        name='passWord'
                                    />
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        Ghi nhớ đăng nhập
                                    </label>
                                    <NavLink className="text-blue-500 hover:underline">Quên mật khẩu?</NavLink>
                                </div>

                                <BtnItem
                                    onClick={btnLogin}
                                    title="Đăng nhập"
                                    classCss="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
                                >
                                </BtnItem>
                            </form>

                            <p className="mt-6 text-sm text-center text-gray-600">
                                Bạn chưa có tài khoản?{' '}
                                <NavLink className="text-blue-500 hover:underline">Đăng ký ngay</NavLink>
                            </p>

                        </div>
                    </div>
                </Box>
            </Fade>

        </>
    );
};

export default Login;
