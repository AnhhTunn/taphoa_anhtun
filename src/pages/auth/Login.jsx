import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/background.jpg';
import BtnItem from '../../components/items/itemBtn/BtnItem';
import getApiAccounts from '../../services/Account/ApiAccount';
import { Alert, Box, Fade } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false); // Toggle login/register

    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
    });

    const [registerData, setRegisterData] = useState({
        userName: "",
        passWord: "",
        email: "",
        phone: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isRegister) {
            setRegisterData({ ...registerData, [name]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

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
                navigate("/");
            } else {
                setErrorMsg("Thông tin đăng nhập không chính xác");
            }
        } catch {
            setErrorMsg("Lỗi khi đăng nhập");
        }
    };

    const btnRegister = async (e) => {
        e.preventDefault();

        const { userName, passWord, email, phone } = registerData;

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!userName || !passWord || !email || !phone) {
            setErrorMsg("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (!usernameRegex.test(userName)) {
            setErrorMsg("Username chỉ được chứa chữ cái và số, không dấu cách hoặc ký tự đặc biệt.");
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMsg("Email không đúng định dạng.");
            return;
        }

        try {
            const data = await getApiAccounts.getAccount();
            const exists = data.find(acc => acc.userName === userName);

            if (exists) {
                setErrorMsg("Tên đăng nhập đã tồn tại");
                return;
            }

            const newUser = { userName, passWord, email, phone };
            await getApiAccounts.addAccount(newUser);
            setSuccessMsg("Đăng ký thành công! Vui lòng đăng nhập.");
            setIsRegister(false);
        } catch {
            setErrorMsg("Lỗi khi đăng ký");
        }
    };

    useEffect(() => {
        if (errorMsg || successMsg) {
            const timeout = setTimeout(() => {
                setErrorMsg("");
                setSuccessMsg("");
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [errorMsg, successMsg]);

    return (
        <>
            {(errorMsg || successMsg) && (
                <div className="fixed top-30 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    {successMsg && <Alert severity="success">{successMsg}</Alert>}
                </div>
            )}
            <Fade in={true} timeout={1500}>
                <Box>
                    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-110"
                            style={{ backgroundImage: `url(${background})` }}
                        ></div>
                        <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
                            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                                {isRegister ? "Đăng ký" : "Đăng nhập"}
                            </h2>

                            <form className="space-y-5">
                                {/* Form ĐĂNG NHẬP */}
                                {!isRegister && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Username"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                name="userName"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                                            <input
                                                onChange={handleChange}
                                                type="password"
                                                placeholder="Password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                name="passWord"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Ghi nhớ đăng nhập
                                            </label>
                                            <span className="text-blue-500 hover:underline cursor-pointer">Quên mật khẩu?</span>
                                        </div>

                                        <BtnItem
                                            onClick={btnLogin}
                                            title="Đăng nhập"
                                            classCss="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
                                        />
                                        <p className="mt-6 text-sm text-center text-gray-600">
                                            Bạn chưa có tài khoản?{" "}
                                            <span
                                                className="text-blue-500 hover:underline cursor-pointer"
                                                onClick={() => setIsRegister(true)}
                                            >
                                                Đăng ký ngay
                                            </span>
                                        </p>
                                    </>
                                )}

                                {isRegister && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Username"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                                name="userName"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                            <input
                                                onChange={handleChange}
                                                type="email"
                                                placeholder="Email"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                                name="email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                                name="phone"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                                            <input
                                                onChange={handleChange}
                                                type="password"
                                                placeholder="Password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                                name="passWord"
                                            />
                                        </div>

                                        <BtnItem
                                            onClick={btnRegister}
                                            title="Đăng ký"
                                            classCss="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
                                        />
                                        <p className="mt-6 text-sm text-center text-gray-600">
                                            Đã có tài khoản?{" "}
                                            <span
                                                className="text-blue-500 hover:underline cursor-pointer"
                                                onClick={() => setIsRegister(false)}
                                            >
                                                Quay lại đăng nhập
                                            </span>
                                        </p>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </Box>
            </Fade>
        </>
    );
};

export default Login;
