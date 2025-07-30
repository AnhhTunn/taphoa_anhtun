import React, { useEffect, useState } from 'react'
import getApi from '../../services/Products/ApiProducts';
import active from '../../assets/images/ico_star_active.png';
import ico_heart from '../../assets/images/ico_heart.png';
import gray from '../../assets/images/ico_star_gray.png';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import BtnItem from '../../components/items/itemBtn/BtnItem'
import { useCart } from '../../context/CartContext';
import { Alert } from '@mui/material';
import ItemProduct from '../../components/products/ItemProduct';
const DetailProduct = () => {
  const star = { active, gray };
  const { addToCart } = useCart();
  const navigate = useNavigate()
  const { id } = useParams();
  const [products, setProducts] = useState([])
  const [productDetail, setProductDetail] = useState([])
  const [addCart, setAddCart] = useState();
  const [totalProduct, setTotalProduct] = useState(null)
  const [filterProduct, setFilterProduct] = useState({
    limit: null
  })
  const listIcon = [ico_heart];
  const filterReview = [
    { key: 'all', label: 'Tất cả', active: true },
  ]
  const loadDetail = async () => {
    try {
      const res = await getApi.fetchDetailProduct(id)
      setProductDetail(res)
    } catch (error) {
      console.log("lỗi", error);
    }
  }
  const btnAdd = (id) => {
    console.log("Thêm vào giỏ hàng:", id);

  };
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await getApi.getTotal();
        const { total } = res;
        setTotalProduct(total);
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
  }, [totalProduct])
  useEffect(() => {
    const fetchProducts = async () => {
      if (!filterProduct) return;
      try {
        const res = await getApi.fetchProducts(filterProduct);
        const { products } = res;
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
        const random = pickRandom(products, 8);
        setProducts(random);
      } catch (error) {
        console.log("Lỗi khi load sản phẩm:", error);
      }
    };
    fetchProducts();
  }, [filterProduct, id]);
  const handleExit = (page) => {
    navigate(page)
  }
  const { rating, reviews, thumbnail, price, title, description, discountPercentage, } = productDetail
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
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <img key={i} className="size-3 inline-block" src={i < rating ? active : gray} alt="" />
    )
  }
  const timeAgoVi = (iso) => {
    if (!iso) return "khá lâu";
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    const s = Math.max(1, Math.floor(diffMs / 1000));
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const dday = Math.floor(h / 24);

    if (dday > 0) return `${dday} ngày trước`;
    if (h > 0) return `${h} giờ trước`;
    if (m > 0) return `${m} phút trước`;
    return `${s} giây trước`;
  };
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const normalized = safeReviews.map((item) => {
    const star = Math.min(5, Math.max(1, Math.round(item?.rating ?? 0)));
    return {
      star,
      comment: item?.comment ?? "",
      date: item?.date ?? null,
      reviewerName: item?.reviewerName ?? "Người dùng",
      reviewerEmail: item?.reviewerEmail ?? "",
    };
  });
  const buckets = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  normalized.forEach((r) => {
    buckets[r.star].push(r);
  });
  const totalReviews = normalized.length;
  const reviewByStar = [5, 4, 3, 2, 1].map((star) => {
    const count = buckets[star].length;
    const pct = totalReviews ? (count / totalReviews) * 100 : 0;
    return {
      star,
      count,
      percentage: +pct.toFixed(2),
    };
  });
  const counts = Object.fromEntries(reviewByStar.map(({ star, count }) => [star, count]));
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
      <div className='py-4 onMobile'>
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
                      {price?.toLocaleString()} $
                    </p>
                    <p className="text-xl font-medium text-gray-500 mt-2 line-through">
                      {priceOriginal?.toLocaleString()}$
                    </p>
                  </div>
                  {discountPercentage && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      Giảm {Math.round(discountPercentage)}%
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
          {/* {Bạn cũng có thể thích} */}
          <div className='py-5'>
            <div className='py-5'>
              <span className='font-bold text-2xl'>Có thể bạn cũng thích</span>
            </div>
            <div className=' row'>
              {products.map((item) => (
                <ItemProduct key={item.id} data={item} star={star} icon={listIcon} handleAddCart={btnAdd} />
              ))}
            </div>
          </div>
          {/* {Đánh giá} */}
          <div className='bg-[#f7f7f8] p-4 rounded-2xl'>
            <div className='pb-4'>
              <span className='font-bold text-2xl'>Đánh giá {title}</span>
            </div>
            <div className='bg-white py-5 rounded-2xl'>
              <div className='row'>
                <div className='col l-2 m-tablet-2 c-12 text-center reviewMobile'>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="leading-none">
                      <span className="text-4xl font-extrabold text-black">
                        {Number(rating ?? 0).toFixed(1)}
                      </span>
                      <span className="text-2xl text-gray-400 align-top">/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <img
                          key={i}
                          src={i < Math.round(rating ?? 0) ? active : gray}
                          alt=""
                          className="w-4 h-4"
                        />
                      ))}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {totalReviews} lượt đánh giá
                    </div>
                    <BtnItem
                      title="Viết đánh giá"
                      classCss="mt-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
                      onClick={() => {
                        document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  </div>
                </div>
                <div className='col l-8 m-tablet-8 c-8'>
                  <div className='space-y-3'>
                    {reviewByStar.map(({ star, percentage }) => (
                      <div key={star} className="flex items-center gap-3">
                        <div className="w-6 text-right text-sm text-gray-700">{star}</div>
                        <img src={active} alt={`${star} sao`} className="w-4 h-4" />
                        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='col l-2 m-tablet-2 c-4 text-center space-y-3'>
                  {[5, 4, 3, 2, 1].map(s => (
                    <div key={s} className='h-[20px] flex items-center justify-center'>
                      <span className='text-gray-500 text-xs'>{counts[s] ?? 0} đánh giá</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            {/* {Hiển thị đánh giá} */}
            <div className="bg-white py-5 rounded-2xl mt-5">
              <div className="pb-4 px-4">
                <span className="font-bold text-2xl">Lọc đánh giá theo</span>
              </div>

              <div className="px-4 flex flex-wrap gap-2 mb-4">
                {filterReview.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    className={[
                      "px-3 py-1.5 rounded-full border text-sm cursor-pointer",
                      chip.active
                        ? "bg-blue-50 text-blue-600 border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    ].join(" ")}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* LIST REVIEWS */}
              <div className="px-4">
                {normalized.map((item, idx) => (
                  <div
                    key={item.id ?? (item.reviewerEmail ? `${item.reviewerEmail}-${item.date}` : idx)}
                    className="py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-semibold">
                          {(item.reviewerName || "N")[0]?.toUpperCase()}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-semibold text-gray-900">{item.reviewerName}</span>
                          <div className="flex items-center gap-0.5">
                            {[0, 1, 2, 3, 4].map(i => (
                              <img
                                key={i}
                                src={i < (item.star ?? 0) ? active : gray}
                                alt=""
                                className="w-4 h-4"
                              />
                            ))}
                          </div>
                          <span className="text-gray-700 text-sm">
                            {item.star >= 5 ? "Tuyệt vời"
                              : item.star === 4 ? "Rất tốt"
                                : item.star === 3 ? "Trung bình"
                                  : item.star === 2 ? "Chưa tốt"
                                    : "Tệ"}
                          </span>
                        </div>

                        <div className="mt-3 text-gray-800">
                          {item.comment?.trim() ? item.comment : "Không"}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-gray-500 text-sm">
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            Đánh giá đã đăng vào {timeAgoVi(item.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {idx !== normalized.length - 1 && <hr className="mt-4 border-gray-400" />}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default DetailProduct
