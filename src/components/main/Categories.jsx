import React from 'react'
import foods from '../../assets/images/Foods.png'
import cosmetics from '../../assets/images/cosmetics.png'
import kitchen from '../../assets/images/kitchen-accessories.png'
import fashion from '../../assets/images/fashion-accessories.png'
import CategoriesItem from './items/CategoriesItem'

import { NavLink } from 'react-router-dom'
import { Box, Fade } from '@mui/material'
const Categories = () => {
    const list_Collection = [
        { image: foods, href: "foods", title: "Foods" },
        { image: cosmetics, href: "cosmetics", title: "Cosmetics" },
        { image: kitchen, href: "kitchen", title: "Kitchen" },
        { image: fashion, href: "fashion", title: "Fashion" },
    ]
    return (
        <section className="my-10">
            <div className="grid wide ">
                <Fade
                    in={true}
                    timeout={1500}
                >
                    <Box>
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold">Our Categories</h2>
                            <NavLink className="h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300">View All</NavLink>
                        </div>
                        <ul className="mt-10 cursor-pointer row ">
                            {
                                list_Collection.map((item, index) => <CategoriesItem dataCate={item} key={index} />)
                            }
                        </ul>
                    </Box>
                </Fade>
            </div>
        </section>
    )
}
export default Categories
