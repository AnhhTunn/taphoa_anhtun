import React from 'react'
import { NavLink } from 'react-router-dom';

const CategoriesItem = ({ dataCate }) => {
    const { image, href, title } = dataCate;
    return (
        <li className="col l-3 c-6 mb-5 group">
            <div className="relative overflow-hidden rounded-3xl">
                <img
                    className="image transition-transform duration-300 ease-in-out group-hover:scale-110 w-full h-auto"
                    src={image}
                    alt=""
                />
                <NavLink
                    to={href}
                    className="absolute left-1/2 bottom-10 transform -translate-x-1/2 mt-8 h-9 bg-white px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition"
                >
                    {title}
                </NavLink>

            </div>
        </li>
    )
}

export default CategoriesItem
