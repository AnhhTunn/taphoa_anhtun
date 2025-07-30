import React, { useEffect, useState } from 'react';
import getApi from '../../services/Products/ApiProducts';
import { Box, Fade, Pagination, Select, MenuItem, FormControl } from '@mui/material';
import ico_heart from '../../assets/images/ico_heart.png';
import ItemProduct from './ItemProduct';
import active from '../../assets/images/ico_star_active.png';
import gray from '../../assets/images/ico_star_gray.png';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';

const Products = () => {
    const { onUpdateCounts } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryFromUrl = queryParams.get("q") || "";

    const defaultFilter = {
        q: queryFromUrl,
        sortBy: "",
        order: "",
        skip: 0,
        limit: 12
    };

    const listIcon = [ico_heart];
    const star = { active, gray };
    const { categoryName } = useParams();

    const [sortBy, setSortBy] = useState("default");
    const [category, setCategory] = useState("default");
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [filterProduct, setFilterProduct] = useState(defaultFilter);

    // ------------------------- Helpers -------------------------
    const filterByCategory = (list, category) => {
        if (category === "default") return list;
        return list.filter(item => item.category?.toLowerCase() === category);
    };

    const sortProducts = (list, sortBy, order) => {
        if (!sortBy) return list;
        const direction = order === "desc" ? -1 : 1;
        return [...list].sort((a, b) => {
            const aField = a[sortBy];
            const bField = b[sortBy];
            if (typeof aField === "string") {
                return aField.localeCompare(bField) * direction;
            }
            return (aField - bField) * direction;
        });
    };

    const loadData = async () => {
        try {
            const res = await getApi.fetchProducts(filterProduct);
            let fetchedProducts = res?.products || [];

            const categoryCountMap = {
                beauty: 0,
                furniture: 0,
                groceries: 0,
                "kitchen-accessories": 0
            };

            fetchedProducts.forEach(item => {
                const key = item.category?.toLowerCase();
                if (key) {
                    categoryCountMap[key] += 1;
                }
            });

            onUpdateCounts(categoryCountMap);

            fetchedProducts = filterByCategory(fetchedProducts, category);
            fetchedProducts = sortProducts(fetchedProducts, filterProduct.sortBy, filterProduct.order);

            const paginated = fetchedProducts.slice(filterProduct.skip, filterProduct.skip + filterProduct.limit);

            setProducts(paginated);
            setTotal(fetchedProducts.length);
        } catch (error) {
            console.error("Lỗi khi load sản phẩm:", error);
        }
    };

    // ------------------------- Event Handlers -------------------------
    const btnAdd = (id) => {
        console.log("Thêm vào giỏ hàng:", id);

    };

    const handleChangePage = (page) => {
        setFilterProduct(prev => ({
            ...prev,
            skip: (page - 1) * 12
        }));
    };

    const handleChangeSort = (event) => {
        const [sortBy, order] = event.target.value.split(',').map(v => v.trim());
        setSortBy(event.target.value);
        setFilterProduct(prev => ({
            ...prev,
            sortBy,
            order
        }));
    };

    const handleChangeCategory = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setFilterProduct(prev => ({
            ...prev,
            skip: 0
        }));
    };

    // ------------------------- useEffect -------------------------
    useEffect(() => {
        loadData();
    }, [filterProduct, category]);

    useEffect(() => {
        setSortBy("default");
        setCategory("default");
        setFilterProduct(defaultFilter);
    }, [location.search]);

    useEffect(() => {
        if (categoryName) {
            setCategory(categoryName);
            setFilterProduct(prev => ({
                ...prev,
                skip: 0
            }));
        } else {
            setSortBy("default");
            setCategory("default");
            setFilterProduct(defaultFilter);
        }
    }, [categoryName]);

    const countPage = Math.ceil(total / 12);

    return (
        <div>
            <div className='grid mb-3'>
                <div className='row flex items-center h-full '>
                    <div className='col l-2 m-tablet-2 c-0'>
                        <span>Sắp xếp theo</span>
                    </div>
                    <div className='col l-0 m-tablet-4 c-6'>
                        <FormControl sx={{ minWidth: 120, width: 200 }} size="small">
                            <Select value={category} onChange={handleChangeCategory}>
                                <MenuItem value="default">Danh mục</MenuItem>
                                <MenuItem value="beauty">Beauty</MenuItem>
                                <MenuItem value="furniture">Furniture</MenuItem>
                                <MenuItem value="groceries">Groceries</MenuItem>
                                <MenuItem value="kitchen-accessories">Kitchen-Accessories</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col l-10 m-tablet-4 c-6'>
                        <FormControl sx={{ minWidth: 120, width: 200 }} size="small">
                            <Select value={sortBy} onChange={handleChangeSort}>
                                <MenuItem value="default">Mặc định</MenuItem>
                                <MenuItem value="price, desc">Giá giảm dần</MenuItem>
                                <MenuItem value="price, asc">Giá tăng dần</MenuItem>
                                <MenuItem value="title, asc">A-Z</MenuItem>
                                <MenuItem value="title, desc">Z-A</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>

            <Fade in={true} timeout={1500}>
                <Box>
                    <div className='onMobile'>
                        <div className='grid wide'>
                        <div className='row'>
                            {products.map(item => (
                                <ItemProduct key={item.id} data={item} star={star} icon={listIcon} handleAddCart={btnAdd} />
                            ))}
                        </div>
                    </div>
                    </div>
                </Box>
            </Fade>

            <div className='flex justify-center items-center p-10'>
                <Pagination onChange={(e, page) => handleChangePage(page)} count={countPage} />
            </div>
        </div>
    );
};

export default Products;
