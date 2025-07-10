import React, { useState } from 'react'
import logo from '../../assets/images/logo.webp'
import ico_search from '../../assets/images/ico_search.png'
import ico_user from '../../assets/images/ico_user.png'
import ico_heart from '../../assets/images/ico_heart.png'
import ico_bag from '../../assets/images/ico_bag.png'
import Menu from './Menu'
import { NavLink, useNavigate } from 'react-router-dom'
import BtnItem from '../items/itemBtn/BtnItem'
import { Box, Fade } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setKeyword } from '../../reduxs/searchSlice'
const Header = () => {
    const [txtSearch, setTxtSearch] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getTxtSearch = (e) => {
        setTxtSearch(e.target.value)
    }
    const btnSearch = () => {
        if (txtSearch) {
            dispatch(setKeyword(txtSearch))
            navigate('/products')
            setTxtSearch("")
        }
    }
    return (
        <>
            <header className="header sticky top-0 z-1000 bg-white">
                <div className='grid wide'>
                    <Fade
                        in={true}
                        timeout={1500}
                    >
                        <Box>
                            <div className='row no-gutters pt-6 pb-6'>
                                <div className='col l-2 c-3'>
                                    <h1 className="flex-shrink-0 h-full flex items-center">
                                        <NavLink to={""} className="block max-w-[130px]" ><img className="max-w-full" src={logo} alt="Darion" /></NavLink>
                                    </h1>

                                </div>
                                <div className="col l-4 c-6">
                                    <div className="relative w-full search-mobile">
                                        <input
                                            type="text"
                                            name="txtSearch"
                                            onChange={getTxtSearch}
                                            id="txtSearch"
                                            value={txtSearch}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') btnSearch();
                                            }}
                                            placeholder="Search..."
                                            className="w-full h-10 px-4 pr-10 border border-black rounded-full focus:outline-none focus:ring-1 focus:ring-black"
                                        />
                                        <BtnItem
                                            classCss=" l-12 c-0 bg-gray-800 absolute p-3 h-full right-0  rounded-r-full top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={btnSearch}
                                            title={<img src={ico_search} alt="Search" className="w-full h-full filter invert" />}
                                        />
                                    </div>
                                </div>
                                <div className='col l-5 c-0'>
                                    <div className='flex items-center h-full justify-center'>
                                        <Menu />
                                    </div>
                                </div>
                                <div className='col l-1 c-3'>
                                    <div className='flex items-center justify-end gap-4 h-full'>
                                        <NavLink to="#">
                                            <img className="w-5 h-5" src={ico_user} alt="User" />
                                        </NavLink>

                                        <NavLink to="#" className="relative">
                                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                10
                                            </span>
                                            <img className="w-5 h-5" src={ico_heart} alt="Heart" />
                                        </NavLink>

                                        <NavLink to="#" className="relative">
                                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                3
                                            </span>
                                            <img className="w-5 h-5" src={ico_bag} alt="Bag" />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </div>
            </header>
        </>
    )
}
export default Header
