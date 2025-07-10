import React from 'react'
import experience from '../../assets/images/img_experience.png'
import { Fade } from '@mui/material'
const Experience = () => {
    return (
        <Fade
            in={true}
            timeout={1500}
        >
            <section className="pt-20 pb-20 mt-20 mb-9 bg-[#ebebe9]">
                <div className="grid wide">
                    <div className="lg:flex items-center justify-between">
                        <div>
                            <p className="text-[14px] uppercase">Trải Nghiệm Người Dùng</p>
                            <h2 className="text-3xl font-semibold py-5 lg:py-10 leading-[1.4]">
                                Sản Phẩm Đa Dạng<br />
                                Chất Lượng<br />
                                Giá Thành Phù Hợp
                            </h2>
                            <a href="#none" className="h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300">View All</a>
                        </div>

                        <div className="rounded-2xl overflow-hidden mt-6 lg:mt-0">
                            <img className="image" src={experience} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </Fade>
    )
}

export default Experience
