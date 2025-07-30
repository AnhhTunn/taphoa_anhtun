import React, { useEffect, useState } from 'react'
import ItemProduct from '../products/ItemProduct'
import ico_heart from '../../assets/images/ico_heart.png'
import active from '../../assets/images/ico_star_active.png'
import gray from '../../assets/images/ico_star_gray.png'
import getApi from '../../services/Products/ApiProducts'
import { Box, Fade } from '@mui/material'
import { NavLink } from 'react-router-dom'
const BestSeller = () => {
    const listIcon = [ico_heart]
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
            if (!filterProduct) return;

            try {
                const res = await getApi.fetchProducts(filterProduct);
                const { products } = res;

                const sorted = [...products].sort(
                    (a, b) => b.minimumOrderQuantity - a.minimumOrderQuantity
                );
                const pickRandom = (arr, n) => {
                    const max = Math.min(n, arr.length);
                    const pickedIdx = new Set();
                    const result = [];
                    while (result.length < max) {
                        const i = Math.floor(Math.random() * arr.length);
                        if (!pickedIdx.has(i)) {
                            pickedIdx.add(i);
                            result.push(arr[i]);
                        }
                    }
                    return result;
                };
                const topSeller = sorted.slice(0, 20);
                const random = pickRandom(topSeller, 8)
                setProducts(random);
            } catch (error) {
                console.log("Lỗi khi load sản phẩm:", error);
            }
        };

        fetchProducts();
    }, [filterProduct]);


    return (
        <>
            <div className='pt-5 onMobile'>
                <Fade
                    in={true}
                    timeout={1500}
                >
                    <Box>
                        <div className='grid wide '>
                            <div className="flex justify-between items-center pb-10">
                                <h2 className="text-3xl font-bold">Best Seller</h2>
                                <NavLink to={'bestseller'} className="h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300">View All</NavLink>
                            </div>
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

export default BestSeller
