import { Box, Fade } from '@mui/material';
import React from 'react';
import { useOutletContext } from 'react-router-dom';

const ProfileOverview = () => {
    const { profile, handleOpenEditDialog } = useOutletContext();

    return (
        <>
            {/* Thông tin cá nhân */}
            <Fade
                in={true}
                timeout={1000}
            >
                <Box>
                    <div className="bg-white rounded shadow p-4 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
                            <span
                                className="text-red-600 text-sm cursor-pointer hover:underline"
                                onClick={handleOpenEditDialog}
                            >
                                ✏️ Cập nhật
                            </span>
                        </div>
                        <div className="grid">
                            <div className='row'>
                                <div className='col l-6 py-3'><span className="text-gray-500">Họ và tên: </span>{profile?.name || "-"}</div>
                                <div className='col l-6 py-3'><span className="text-gray-500">Số điện thoại: </span>{profile?.phone || "-"}</div>
                                <div className='col l-6 py-3'><span className="text-gray-500">Giới tính: </span>{profile?.gender ? "Nam" : "Nữ"}</div>
                                <div className='col l-6 py-3'><span className="text-gray-500">Email: </span>{profile?.email || "-"}</div>
                                <div className='col l-6 py-3'><span className="text-gray-500">Ngày sinh: </span>{profile?.birthDay || "-"}</div>
                                <div className='col l-6 py-3'><span className="text-gray-500">Địa chỉ mặc định: </span>{profile?.diaChi || "-"}, {profile?.huyen || "-"}, {profile?.thanhPho || "-"}</div>
                            </div>
                        </div>
                    </div>

                    {/* Sổ địa chỉ */}
                    <div className="bg-white rounded shadow p-4">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold">Sổ địa chỉ</h2>
                            <span className="text-red-600 text-sm cursor-pointer hover:underline">+ Thêm địa chỉ</span>
                        </div>
                        {(!!profile?.name && !!profile?.phone && !!profile?.diaChi) ? (
                            <div className="border p-4 rounded relative bg-gray-50 text-sm">
                                <div className="font-semibold">{profile.name}</div>
                                <div className="text-gray-600">{profile.name} | {profile.phone}</div>
                                <div className="mt-1">{profile.diaChi}, {profile.huyen}, {profile.thanhPho}</div>
                                <div className="flex gap-2 mt-2">
                                    <span className="bg-gray-200 text-xs px-2 py-1 rounded">🏠 Nhà</span>
                                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">Mặc định</span>
                                </div>
                                <div className="absolute right-4 bottom-4 text-sm flex gap-4 text-blue-600 cursor-pointer">
                                    <span className="hover:underline">Xoá</span>
                                    <span className="hover:underline">Cập nhật</span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </Box>
            </Fade>

        </>
    );
};

export default ProfileOverview;
