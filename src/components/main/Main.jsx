import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import Experience from './Experience'
import BestSeller from './BestSeller'

const Main = () => {
    return (
        <>
            <Banner />
            <div className='categories-mobile'>
                <Categories />
            </div>

            <BestSeller />
            <Experience />
        </>
    )
}

export default Main
