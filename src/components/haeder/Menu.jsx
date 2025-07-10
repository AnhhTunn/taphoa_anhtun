import React from 'react'
import { setKeyword } from '../../reduxs/searchSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
const Menu = () => {
    const dispatch = useDispatch();
    const listMenu = [
        { href: "", title: "Home" },
        { href: "hehe", title: "Shop" },
        { href: "products", title: "Product" },
        { href: "#none", title: "Blog" },
        { href: "#none", title: "Fetured" },
    ];

    const handleClick = (href) => {
        if (href === "products") {
            dispatch(setKeyword("")); // Reset tìm kiếm về mặc định
        }
    };

    return (
        <div>
            <nav className="lg:block ml-auto">
                <ul className="flex items-center gap-10">
                    {
                        listMenu.map((item, index) =>
                            <li key={index}
                                className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100"
                                onClick={() => handleClick(item.href)}
                            >
                                <NavLink to={item.href}>{item.title}</NavLink>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </div>
    );
}
export default Menu
