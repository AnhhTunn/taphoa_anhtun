import React, { useEffect, useState } from 'react'
import getApi from '../../services/Products/ApiProducts';
import active from '../../assets/images/ico_star_active.png';
import ico_heart from '../../assets/images/ico_heart.png';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import BtnItem from '../../components/items/itemBtn/BtnItem'
import { useCart } from '../../context/CartContext';
import { Alert } from '@mui/material';
const DetailProduct = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate()
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([])
  const [addCart, setAddCart] = useState();
  const loadDetail = async () => {
    try {
      const res = await getApi.fetchDetailProduct(id)
      setProductDetail(res)
    } catch (error) {
      console.log("lỗi", error);
    }
  }
  const handleExit = (page) => {
    navigate(page)
  }
  const { rating, reviews, thumbnail, price, title, description, discountPercentage } = productDetail
  const listBack = [
    { title: "Trang chủ", herf: "/", icon: <FaHome /> },
    { title: "Sản phẩm", herf: "/products" },
  ]
  useEffect(() => {
    if (id) loadDetail();
  }, [id])
  const btnBuy = (id) => {
    console.log(id);
    
    const product = {
      ...productDetail,
      quantity: 1
    };
    localStorage.setItem("checkoutItem", JSON.stringify(product));
    navigate("/checkout");
  };
  const priceOriginal = (100 / (100 - discountPercentage)) * price
  useEffect(() => {
    setTimeout(() => setAddCart(""), 2000)
  }, [addCart])
  return (
    <>
      {addCart && (
        <div className="fixed top-30 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 ">
          <Alert severity="success" className="shadow-lg">
            {addCart}
          </Alert>
        </div>
      )}
      <div className='py-4'>
        <div className="grid wide">
          <div className='space-y-6'>
            <ul className='flex items-center text-sm'>
              {listBack.map((item, index) => (
                <li className='flex items-center gap-2' key={index}>
                  <span>
                    {item.icon}
                  </span>
                  <span className="cursor-pointer" onClick={() => handleExit(item.herf)}>
                    {item.title}
                  </span>
                  <span>/</span>
                </li>
              ))}
              <li className='ml-3 text-gray-500'>{title}</li>
            </ul>
            <div className="row space-y-3">
              <div className="col l-6 m-tablet-6 c-12">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <img src={active} alt="Rating" className="w-4 h-4" />
                  <span>{Number(rating).toFixed(1)}</span>
                  <span>({reviews?.length || 0} đánh giá)</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <img src={ico_heart} alt="Heart" className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                  <span className="text-gray-500 text-sm">Yêu thích</span>
                </div>
                <div className="rounded-xl overflow-hidden mt-4 border">
                  <img src={thumbnail} alt={title} className="mx-auto w-fit h-fit object-cover rounded-xl" />
                </div>
              </div>
              <div className="col l-6 m-tablet-6 c-12">
                <div className="bg-red-50 p-6 rounded-xl border border-red-200 space-y-2">
                  <p className="text-gray-500 text-sm">Giá sản phẩm</p>
                  <div className='flex gap-2'>
                    <p className="text-3xl font-bold text-red-600 mt-1">
                      {price?.toLocaleString()}đ
                    </p>
                    <p className="text-xl font-medium text-gray-500 mt-2 line-through">
                      {priceOriginal?.toLocaleString()}đ
                    </p>
                  </div>
                  {discountPercentage && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      Giảm {discountPercentage}%
                    </p>
                  )}
                </div>
                <div className='space-y-2 py-3'>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Mô tả sản phẩm</h3>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>
                <div className='flex gap-3'>
                  <BtnItem title={"Buy now"}
                    classCss="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
                    onClick={() => btnBuy(id)} />
                  <BtnItem
                    classCss="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
                    title={"Add to Cart"}
                    onClick={() => {
                      const user = localStorage.getItem("user");
                      if (!user) {
                        navigate("/login");
                      } else {
                        addToCart(productDetail);
                        setAddCart(`Thêm thành công sản phẩm: ${title}`)
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailProduct
