import { useState } from 'react';
import img_product_list_banner from '../../assets/images/img_product_list_banner.webp'
import { Outlet } from 'react-router-dom'
import { Box, Fade } from '@mui/material';
const TopSeller = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryCounts, setCategoryCounts] = useState({
        beauty: 0,
        furniture: 0,
        groceries: 0,
        kitchen_accessories: 0
    });
    const categories = [
        { name: 'Beauty', key: 'beauty', count: categoryCounts.beauty },
        { name: 'Furniture', key: 'furniture', count: categoryCounts.furniture },
        { name: 'Groceries', key: 'groceries', count: categoryCounts.groceries },
        { name: 'Kitchen-Accessories', key: 'kitchen-accessories', count: categoryCounts['kitchen-accessories'] },
    ];
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const availability = [
        { name: 'In stock', count: 16 },
        { name: 'Out of stock', count: 1 },
    ];
    const handleAllProducts = () => {
        setSelectedCategory(null);
    }

    return (
        <Fade
            in={true}
            timeout={1500}
        >
            <Box>
                <div className='w-full '>
                    <div className='w-full'>
                        <img className='w-full h-[200px]' src={img_product_list_banner} alt="" />
                    </div>
                    <div className='grid wide'>
                        <div className='row '>

                            <div className='col l-3 m-tablet-0 c-0'>
                                <div className="py-4">
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-2 cursor-pointer"
                                            onClick={handleAllProducts}
                                        >Category</h3>
                                        <ul className="space-y-1">
                                            {categories.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleCategoryClick(item.key)}
                                                    className={`cursor-pointer flex justify-between px-2 py-1 rounded 
                                                        ${selectedCategory === item.key
                                                            ? "text-red-500"
                                                            : "text-gray-700 hover:text-black"
                                                        }`}
                                                >
                                                    <span>{item.name}</span>
                                                    <span className={selectedCategory === item.key ? "text-red-500" : "text-gray-500"}>
                                                        ({item.count > 0 ? item.count : "0"})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Availability</h3>
                                        <ul className="space-y-1">
                                            {availability.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="text-gray-700 hover:text-black cursor-pointer flex justify-between px-2 py-1 rounded "
                                                >
                                                    <span>{item.name}</span>
                                                    <span className="text-gray-500">({item.count})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col l-9 pt-4'>
                                <Outlet context={{ onUpdateCounts: setCategoryCounts, selectedCategory }} />
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Fade>
    )
}

export default TopSeller
