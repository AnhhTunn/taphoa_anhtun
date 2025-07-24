import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import getApiProfile from '../../services/Account/ApiProfile';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditProfile({ idDetail, onClose }) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSave = async () => {
        if (!profile?.id) return;
        try {
            await getApiProfile.updateProfile(profile.id, profile);
            alert('Cập nhật thông tin thành công!');
            onClose(); // Đóng dialog sau khi lưu
            window.location.reload();
        } catch (error) {
            console.log(error);

        }
    };
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={!!idDetail}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Thông tin cá nhân
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className="w-[500px] space-y-4 py-5 px-10">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Họ tên:</label>
                            <input
                                name="name"
                                value={profile?.name || ''}
                                onChange={handleChange}
                                className="w-3/5 border p-2 rounded"
                                placeholder="Họ và tên"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Số điện thoại:</label>
                            <input
                                name="phone"
                                value={profile?.phone || ''}
                                onChange={handleChange}
                                className="w-3/5 border p-2 rounded"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Tỉnh/Thành phố:</label>
                            <input
                                name="thanhPho"
                                value={profile?.thanhPho || ''}
                                onChange={handleChange}
                                className="w-3/5 border p-2 rounded"
                                placeholder="Tỉnh/thành phố"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Quận/Huyện:</label>
                            <input
                                name="huyen"
                                value={profile?.huyen || ''}
                                onChange={handleChange}
                                className="w-3/5 border p-2 rounded"
                                placeholder="Quận/huyện"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Địa chỉ:</label>
                            <input
                                name="diaChi"
                                value={profile?.diaChi || ''}
                                onChange={handleChange}
                                className="w-3/5 border p-2 rounded"
                                placeholder="Số nhà, tên đường"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="px-6 pb-4">
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: '#10b981',
                            '&:hover': { backgroundColor: '#059669' },
                            textTransform: 'none',
                            borderRadius: '8px',
                            paddingX: 3,
                            paddingY: 1,
                        }}
                    >
                        Lưu thay đổi
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
