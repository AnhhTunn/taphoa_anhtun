import React from 'react'
import img_banner from '../../assets/images/img_banner.webp'
import { Box, Fade } from '@mui/material'
import ico_freeship from '../../assets/images/ico_freeship.svg'
import ico_quality from '../../assets/images/ico_quality.svg'
import ico_return from '../../assets/images/ico_return.svg'
import ico_support from '../../assets/images/ico_support.svg'
import ServiceItem from './items/ServiceItem'
const Banner = () => {
    const listService = [
        { title: "Free Shipping Over $50", image: ico_freeship },
        { title: "Quality Assurance", image: ico_quality },
        { title: "Return within 14 days", image: ico_return },
        { title: "Support 24/7", image: ico_support },
    ]
    return (
        <>
            <Fade
                in={true}
                timeout={1500}
            >
                <Box>
                    <section className="relative overflow-hidden">
                        <img className="w-full h-auto" src={img_banner} alt="Banner" />
                        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10">
                            <div className="max-w-[1200px]">
                                <h1 className="text-white/90 text-xl sm:text-2xl md:text-4xl font-bold text-center drop-shadow-xl">
                                    Chào mừng đến với Darion Shop – nơi trải nghiệm mua sắm thời trang phong cách và hiện đại!
                                </h1>
                            </div>
                        </div>
                    </section>
                    <section className="bg-[#ebebe9] py-6">
                        <div className="grid wide">
                            <div className='row no-gutters'>
                                {
                                    listService.map((item, index) => (
                                        <ServiceItem dataService={item} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                </Box>
            </Fade>
            
        </>
    )
}

export default Banner
