import { Box, Fade } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <Fade
            in={true}
            timeout={1500}
        >
            <Box>
                <footer className="bg-gray-100 py-12 footer-mobile">
                    <div className="grid wide">
                        <div className="row no-gutters">
                            <div className='col l-3 c-12 itemFooter'>
                                <h3 className="font-bold text-lg mb-4">About Us</h3>
                                <ul className="space-y-2">
                                    <li><NavLink className="hover:underline">Our Shops</NavLink></li>
                                    <li><NavLink className="hover:underline">Contact</NavLink></li>
                                    <li><NavLink className="hover:underline">Artists</NavLink></li>
                                    <li><NavLink className="hover:underline">Local Giving</NavLink></li>
                                    <li><NavLink className="hover:underline">Press</NavLink></li>
                                </ul>
                            </div>
                            <div className='col l-3 c-12 itemFooter'>
                                <h3 className="font-bold text-lg mb-4">Customer Services</h3>
                                <ul className="space-y-2">
                                    <li><NavLink className="hover:underline">FAQs</NavLink></li>
                                    <li><NavLink className="hover:underline">Store Locator</NavLink></li>
                                    <li><NavLink className="hover:underline">Returns</NavLink></li>
                                    <li><NavLink className="hover:underline">Shipping Information</NavLink></li>
                                    <li><NavLink className="hover:underline">Wholesale</NavLink></li>
                                </ul>

                            </div>
                            <div className=" col l-6 c-12 itemFooter">
                                <h3 className="font-semibold text-xl mb-4 lg:text-center">Sign Up For Our Newsletter To Receive Notifications And Other Promotions</h3>
                                <div className="flex mt-4">
                                    <input type="email" placeholder="Email address..." className="flex-grow px-4 py-4 rounded-l-full border border-r-0 border-gray-300 focus:outline-none focus:border-black" />
                                    <button className="bg-black text-white px-6 py-2 rounded-r-full hover:bg-gray-800 transition duration-300">Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <p className="text-sm text-gray-600 mb-4 md:mb-0 text-center">Copyright © 2024. All Right Reserved</p>
                        </div>
                    </div>
                </footer>
            </Box>
        </Fade>
    )
}

export default Footer
