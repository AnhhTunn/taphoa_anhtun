import React, { useEffect, useState } from 'react';
import { FaUser, FaHistory } from 'react-icons/fa';
import getApiProfile from '../../services/Account/ApiProfile';
import EditProfile from './EditProfile';
import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) {
            fetchProfile(user.id);
        } else {
            console.warn("Không tìm thấy user trong localStorage");
        }
    }, []);

    const fetchProfile = async (accountId) => {
        const data = await getApiProfile.getProfileByAccountId(accountId);
        if (data && data.length > 0) {
            setProfile(data[0]);
        } else {
            console.warn("Không tìm thấy profile tương ứng với accountId:", accountId);
        }
    };
    const handleOpenEditDialog = () => setOpenEditDialog(true);
    const handleCloseEditDialog = () => setOpenEditDialog(false);

    return (
        <>
            <div className='py-6'>
                <div className="grid wide">
                    <div className='row'>
                        {/* Sidebar */}
                        <div className="col l-4 bg-white shadow rounded-2xl p-4 space-y-3">
                            <MenuItem icon={<FaUser />} label="Thông tin tài khoản" to="/profile" />
                            <MenuItem icon={<FaHistory />} label="Lịch sử mua hàng" to="/profile/purchaseHistory" />
                        </div>

                        {/* Main content */}
                        <div className="col l-8 flex-1 space-y-6">
                            <Outlet context={{ profile, handleOpenEditDialog }} />
                        </div>
                    </div>
                </div>
            </div>

            {openEditDialog && (
                <EditProfile idDetail={profile?.id} onClose={handleCloseEditDialog} />
            )}
        </>
    );
};

const MenuItem = ({ icon, label, to }) => {
    const isExact = to === "/profile";
    return (
        <NavLink
            to={to}
            end={isExact}
            className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded cursor-pointer 
                ${isActive ? 'bg-red-100 text-red-600 font-semibold' : 'hover:bg-gray-100'}`
            }
        >
            <span className="text-base">{icon}</span>
            <span>{label}</span>
        </NavLink>
    );
};

export default Profile;
