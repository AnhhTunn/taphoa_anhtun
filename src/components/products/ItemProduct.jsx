import { Alert, Box, Grow, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import ImageWithSkeleton from './ImageWithSkeleton'
import BtnItem from '../items/itemBtn/BtnItem'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../reduxs/slices/productSlice'
const ItemProduct = (props) => {
    const dispatch = useDispatch();
    const { addToCart } = useCart();
    const { data, icon, star } = props
    const { id, thumbnail, title, price, rating } = data
    const { active, gray } = star
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false)

    const stars = []
    for (let i = 0; i < 5; i++) {
        stars.push(
            <img key={i} className="size-3 inline-block" src={i < rating ? active : gray} alt="" />
        )
    }
    const [addCart, setAddCart] = useState();
    const btnDetail = (id) => {
        dispatch(setSelectedProduct(id));
        navigate(`/detail/${id}`);
    }
    setTimeout(() => setAddCart(""), 2000)
    return (
        <>
            {addCart && (
                <div className="fixed top-30 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 ">
                    <Alert severity="success" className="shadow-lg">
                        {addCart}
                    </Alert>
                </div>
            )}
            <div className='col l-3 m-tablet-6 c-6 cursor-pointer'>
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={1500}
                >
                    <Box>
                        <div className='relative group text-center mb-5'>
                            <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
                                {icon.map((icon, idx) => (
                                    <li
                                        key={icon}
                                        className={`opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-${idx * 100}`}
                                    >
                                        <BtnItem
                                            classCss="cursor-pointer shadow-lg p-3 rounded-full bg-white hover:bg-slate-200 transition"
                                            title={<img src={icon} className="w-4 h-4" alt={icon} />}
                                        >
                                        </BtnItem>
                                    </li>
                                ))}
                            </ul>

                            {/* Image with skeleton */}
                            <div className='rounded-xl overflow-hidden bg-[#ebebe9]' onClick={() => btnDetail(id)}>
                                <ImageWithSkeleton src={thumbnail} alt="ảnh sản phẩm" onLoad={() => setLoaded(true)} />
                            </div>

                            {/* Loading nội dung */}
                            {!loaded ? (
                                <div className="p-3">
                                    <Skeleton variant="text" width="60%" className="mx-auto mb-1" />
                                    <Skeleton variant="text" width="40%" className="mx-auto mb-1" />
                                    <Skeleton variant="text" width="80%" className="mx-auto mb-1" />
                                </div>
                            ) : (
                                <>
                                    <div>{stars}</div>
                                    <span>{title}</span>
                                    <div className="mt-2 relative h-5 overflow-hidden p-3">
                                        <div className="absolute inset-x-0 mx-auto w-max group-hover:bottom-0 -bottom-5 transition-all duration-300">
                                            <div className="font-bold text-[15px] text-center text-red-500">
                                                {price} $
                                            </div>
                                            <BtnItem
                                                classCss="cursor-pointer uppercase text-xs font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-200"
                                                title={"add to cart"}
                                                onClick={() => {
                                                    const user = localStorage.getItem("user");
                                                    if (!user) {
                                                        navigate("/login");
                                                    } else {
                                                        addToCart(data);
                                                        setAddCart(`Thêm thành công sản phẩm: ${title}`)
                                                    }
                                                }}
                                            >
                                            </BtnItem>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Box>
                </Grow>
            </div>
        </>
    )
}

export default ItemProduct
