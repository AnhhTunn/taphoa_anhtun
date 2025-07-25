import React, { useEffect, useState } from 'react'
import ico_heart from '../../assets/images/ico_heart.png'
import ico_reload from '../../assets/images/ico_reload.png'
import ico_search from '../../assets/images/ico_search.png'
import active from '../../assets/images/ico_star_active.png'
import gray from '../../assets/images/ico_star_gray.png'
import getApi from '../../services/Products/ApiProducts';
import { Box, Fade } from '@mui/material'
import { NavLink, useOutletContext } from 'react-router-dom'
import ItemProduct from '../../components/products/ItemProduct'

const SellerItem = () => {
    const { onUpdateCounts, selectedCategory } = useOutletContext();
    const listIcon = [ico_heart, ico_reload, ico_search]
    const star = { active, gray }
    const [products, setProducts] = useState([]);
    const [totalProduct, setTotal] = useState(null);
    const [filterProduct, setFilterProduct] = useState({
        limit: null
    })
    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const res = await getApi.getTotal();
                const { total } = res;
                setTotal(total);
            } catch (error) {
                console.log("Lỗi khi lấy tổng sản phẩm:", error);
            }
        };
        fetchTotal();
    }, []);

    useEffect(() => {
        if (totalProduct) {
            setFilterProduct({ limit: totalProduct });
        }
    }, [totalProduct]);
    useEffect(() => {
        const fetchProducts = async () => {
            if (!filterProduct?.limit) return;

            try {
                const res = await getApi.fetchProducts(filterProduct);
                const allProducts = res?.products || [];
                const sorted = [...allProducts].sort(
                    (a, b) => b.minimumOrderQuantity - a.minimumOrderQuantity
                );
                const topSeller = sorted.slice(0, 20);
                const filteredProducts = selectedCategory
                    ? topSeller.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase())
                    : topSeller;
                const categoryCountMap = {};
                topSeller.forEach(item => {
                    const key = item.category?.toLowerCase();
                    if (key) {
                        categoryCountMap[key] = (categoryCountMap[key] || 0) + 1;
                    }
                });

                onUpdateCounts(categoryCountMap);
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Lỗi khi load sản phẩm:", error);
            }
        };

        fetchProducts();
    }, [filterProduct, selectedCategory]);
    return (
        <>
            <div className=' pt-5'>
                <Fade
                    in={true}
                    timeout={1500}
                >
                    <Box>
                        <div className='grid wide '>
                            <div className='row '>
                                {products.map((item) =>
                                    <ItemProduct key={item.id} data={item} star={star} icon={listIcon} />
                                )}
                            </div>
                        </div>
                    </Box>
                </Fade>
            </div>
        </>
    )
}

export default SellerItem
