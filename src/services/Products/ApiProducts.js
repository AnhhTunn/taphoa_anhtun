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

            // ⚠ override limit to get full data
            const res = await axios.get(url, { params: { ...params, limit: 194, skip: 0 } });

            if (res.status === 200) return res.data;
        } catch (error) {
            console.log("Lỗi xảy ra khi gọi API fetchProducts:", error);
        }
    },

    fetchProductsByCategory: async (category, filter) => {
        try {
            const res = await fetch(`${BASE_URL}/category/${category}?limit=${filter.limit}&skip=${filter.skip}&q=${filter.q}`);
            if (res.status === 200) return res.data;
        } catch (error) {
            console.log("Lỗi xảy ra khi gọi API fetchProducts:", error);
        }
    },
};

export default getApi;
