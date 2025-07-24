import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home/Home";
import ListProducts from "../pages/listProducts/ListProducts";
import TopSeller from "../pages/listProducts/TopSeller";
import Products from "../components/products/Products";
import MainProducts from "../components/products/MainProducts";
import Login from "../pages/auth/Login";
import ShoppingCart from "../pages/cart/ShoppingCart";
import CheckOut from "../pages/checkout/CheckOut";
import Profile from "../pages/profile/Profile";
import ProfileOverview from "../pages/profile/ProfileOverview";
import PurchaseHistory from "../pages/profile/PurchaseHistory";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<Layout />),
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "products",
                element: <MainProducts />,
                children: [
                    {
                        path: "",
                        element: <Products />,
                    },
                    {
                        path: "search",
                        element: <Products />,
                    },
                    {
                        path: "category/:categoryName",
                        element: <Products />,
                    }
                ]
            },
            {
                path: "foods",
                element: <ListProducts />,
            },
            {
                path: "cosmetics",
                element: <ListProducts />,
            },
            {
                path: "kitchen",
                element: <ListProducts />,
            },
            {
                path: "fashion",
                element: <ListProducts />,
            },
            {
                path: "bestseller",
                element: <TopSeller />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "cart",
                element: <ShoppingCart />,
            },
            {
                path: "checkout",
                element: <CheckOut />,
            },
            {
                path: "profile",
                element: <Profile />,
                children: [
                    {
                        path: "",
                        element: <ProfileOverview />,
                    },
                    {
                        path: "purchaseHistory",
                        element: <PurchaseHistory />,
                    },
                ]
            },
        ]
    },

])
export default router
