import axios from "axios";

const profileUrl = "https://6868901ed5933161d70be224.mockapi.io/profile";

const getApiProfile = {
    getProfileByAccountId: async (accountId) => {
        try {
            const res = await axios.get(`${profileUrl}?accountId=${accountId}`);
            if (res.status === 200) return res.data;
        } catch (error) {
            console.log("Lỗi xảy ra khi gọi API getProfile:", error);
        }
    },

    updateProfile: async (id, data) => {
        try {
            const res = await axios.put(`${profileUrl}/${id}`, data);
            if (res.status === 200 || res.status === 201) return res.data;
        } catch (error) {
            console.log("Lỗi xảy ra khi cập nhật profile:", error);
        }
    },
    addProfile: async (profileData) => {
        try {
            const res = await axios.post(profileUrl, profileData);
            if (res.status === 200 || res.status === 201) return res.data;
        } catch (error) {
            console.log("Lỗi xảy ra khi tạo profile:", error);
        }
    }
};

export default getApiProfile;
