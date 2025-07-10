import React, { useEffect, useState } from 'react';
import getApi from '../../services/Products/ApiProducts';
import { Box, Fade, Button, Pagination } from '@mui/material';
import ico_heart from '../../assets/images/ico_heart.png';
import ico_reload from '../../assets/images/ico_reload.png';
import ico_search from '../../assets/images/ico_search.png';
import ItemProduct from './ItemProduct';
import active from '../../assets/images/ico_star_active.png';
import gray from '../../assets/images/ico_star_gray.png';
import { useSelector } from 'react-redux';

const Products = () => {
    const keyword = useSelector(state => state.search.keyword);
    const listIcon = [ico_heart, ico_reload, ico_search];
    const star = { active, gray };

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(null);
    const [filterProduct, setFilterProduct] = useState({
        q: "",
        sortBy: "",
        order: "",
        skip: 0,
        limit: 12
    });

    const loadData = async () => {
        try {
            const res = await getApi.fetchProducts(filterProduct);
            const { products, total } = res;
            setProducts(products);
            setTotal(total);
        } catch (error) {
            console.log("Lỗi khi load sản phẩm:", error);
        }
    };

    // Khi keyword thay đổi, cập nhật filterProduct
    useEffect(() => {
        setFilterProduct(prev => ({
            ...prev,
            q: keyword,
            skip: 0,
            limit: 12
        }));
    }, [keyword]);

    // Khi filterProduct thay đổi, gọi API
    useEffect(() => {
        loadData();
    }, [filterProduct]);

    const btnAdd = (id) => {
        console.log("Thêm vào giỏ hàng:", id);
    };
    const handleChangePage = (page) => {
        setFilterProduct(prev => ({
            ...prev,
            skip: (page - 1) * 12
        }));
    }
    const countPage = total / 12;

    return (
        <div className='mt-10'>
            <Fade
                in={true}
                timeout={1500}
            >
                <Box>
                    <div className='grid wide '>
                        <div className='row '>
                            {products.map((item) =>
                                <ItemProduct key={item.id} data={item} star={star} icon={listIcon} handleAddCart={btnAdd} />
                            )}
                        </div>
                    </div>
                </Box>
            </Fade>
            <div className='flex justify-center items-center p-10'>
                <Pagination onChange={(e, page) => handleChangePage(page)} count={Math.ceil(countPage)} size="" />
            </div>
        </div>
    );
};

export default Products;
