import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

const getApi = {
    getTotal: async () => {
        try {
            const res = await axios.get(BASE_URL);
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.log("Lỗi xảy ra khi gọi API fetchProducts:", error);
        }
    },
    fetchProducts: async (params) => {
        try {
            const url = params.q
                ? `${BASE_URL}/search`
                : BASE_URL;

            const res = await axios.get(url, { params });
            if (res.status === 200) return res.data;
        } catch (error) {
            console.log("Lỗi xảy ra khi gọi API fetchProducts:", error);
        }
    }


};

export default getApi;
