import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home/Home";
import ListProducts from "../pages/listProducts/ListProducts";
import TopSeller from "../pages/listProducts/TopSeller";
import Test from "../components/products/Test";
import Products from "../components/products/Products";

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
                element: <Test />,
                children: [
                    {
                        path: "",
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
        ]
    },

])
export default router
