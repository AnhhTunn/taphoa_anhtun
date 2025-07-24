import React from 'react'
import Header from './haeder/Header'
import { Outlet } from 'react-router-dom'
import Banner from './main/Banner'
import Footer from './footer/Footer'
import ScrollToTop from './ScrollToTop'

const Layout = () => {
    return (
        <>
            <ScrollToTop />

            <Header />
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout
