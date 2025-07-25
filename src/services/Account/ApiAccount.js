import axios from "axios";
const url = "https://6868901ed5933161d70be224.mockapi.io/accounts";
const urlProfile = "https://6868901ed5933161d70be224.mockapi.io/profile";
const getApiAccounts = {
    getAccount: async () => {
        try {
            const res = await axios.get(url)
            if (res.status === 200) return res.data
        } catch (error) {
            console.log("Lỗi xảy ra khi gọi API getAccount:", error);
        }
    },
    addAccount: async ({ userName, passWord, email, phone }) => {
        try {
            // Bước 1: Tạo tài khoản
            const resAccount = await axios.post(url, {
                userName,
                passWord
            });
            if (resAccount.status === 201) {
                const accountId = resAccount.data.id;
                const resProfile = await axios.post(urlProfile, {
                    email,
                    phone,
                    accountId
                });
                if (resProfile.status === 201) {
                    console.log("Tạo tài khoản và profile thành công");
                    return { account: resAccount.data, profile: resProfile.data };
                } else {
                    console.log("Tạo tài khoản thành công nhưng lỗi khi thêm profile");
                }
            } else {
                console.log("Tạo tài khoản thất bại");
            }
        } catch (error) {
            console.log("Lỗi xảy ra khi thêm Account và Profile:", error);
        }
    }
}
export default getApiAccounts