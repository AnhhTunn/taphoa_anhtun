import axios from "axios";
const url = "https://6868901ed5933161d70be224.mockapi.io/accounts";
const getApiAccounts = {
    getAccount: async () => {
        try {
            const res = await axios.get(url)
            if (res.status === 200) return res.data
        } catch (error) {
            console.log("Lỗi xảy ra khi gọi API getAccount:", error);
        }
    }
}
export default getApiAccounts