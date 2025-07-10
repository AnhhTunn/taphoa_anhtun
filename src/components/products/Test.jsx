import React from 'react'
import img_product_list_banner from '../../assets/images/img_product_list_banner.webp'
import { Outlet } from 'react-router-dom'
const Test = () => {
    const categories = [
        { name: 'Bathroom', count: 6 },
        { name: 'Chair', count: 7 },
        { name: 'Decor', count: 17 },
        { name: 'Lamp', count: 3 },
        { name: 'Table', count: 9 },
    ];

    const availability = [
        { name: 'In stock', count: 16 },
        { name: 'Out of stock', count: 1 },
    ];
    return (
        <div className='w-full '>
            <div className='w-full'>
                <img src={img_product_list_banner} alt="" />
            </div>
            <div className='grid wide'>
                <div className='row '>
                    <div className='col l-3'>
                        <div className="p-4">
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-2">Category</h3>
                                <ul className="space-y-1">
                                    {categories.map((item, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 hover:text-black cursor-pointer flex justify-between"
                                        >
                                            <span>{item.name}</span>
                                            <span className="text-gray-500">({item.count})</span>
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
                                            className="text-gray-700 hover:text-black cursor-pointer flex justify-between"
                                        >
                                            <span>{item.name}</span>
                                            <span className="text-gray-500">({item.count})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col l-9'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test
