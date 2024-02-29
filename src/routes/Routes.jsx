import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import About from "../pages/About/About/About";
import CareGuide from "../pages/CareGuide/CareGuide/CareGuide";
import Shipping from "../pages/Shipping/Shipping/Shipping";
import Sustainability from "../pages/Sustainability/Sustainability/Sustainability";
import Home from "../pages/home/Home";

import AllBlogs from "../pages/all-blogs/AllBlogs";
import CategoryBlogs from "../pages/CategoryBlogs/CategoryBlogs";
import Blog from "../pages/blog/Blog";
import Product from "../pages/product/product";
import ProductCategory from "../pages/product/product_category";
import ProductCollection from "../pages/product/product_collection";
import ProductDetails from "../pages/product-details/ProductDetails";
import Contact from "../pages/contact/Contact";
import Collections from "../pages/collections/collections";
import Checkout from "../pages/Checkout/Checkout";
import CheckoutInfo from "../pages/Checkout/CheckoutInfo";
import PayStatus from "../pages/Checkout/PayStatus";
import PayStatusPaypal from "../pages/Checkout/PayStatusPaypal";
import ShippingInfo from "../pages/Checkout/ShippingInfo";
import PaymentInfo from "../pages/Checkout/PaymentInfo";
import TestPayement from "../pages/Checkout/TestPayement";
import BuyerReview from "../pages/product-details/BuyerReview";
import OrderInformation from "../pages/Checkout/OrderInformation";
import OrderConfirm from "../pages/Checkout/OrderConfirm";
/*
<Route path='/' element={<Home />} />
				<Route path='/collections' element={<Collections />} />
				<Route path='/all-blogs' element={<AllBlogs />} />
				<Route path='/blog' element={<Blog />} />
				<Route path='/product' element={<Product />} />
				<Route path='/product-details' element={<ProductDetails />} />
				<Route path='/contact' element={<Contact />} />

*/

import TermsOfService from "../pages/policy/TermsOfService";
import Privacypolicy from "../pages/policy/Privacypolicy";
import AboutUs from "../pages/policy/AboutUs";
import ContactUs from "../pages/policy/ContactUs";
import RefundPolicy from "../pages/policy/RefundPolicy";
import ShippingPolicy from "../pages/policy/ShippingPolicy";
import Brand from "../pages/Brand/Brand";
import Care from "../pages/Care/Care";

import FAQPage from "../pages/all-faqs/FAQPage";
import OrderList from "../pages/all-orders/OrderList";

import Account from "../pages/account/account";
import NotFound from "../NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/categories",
        element: <Collections />,
      },
      {
        path: "/all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "/category-blogs/:id/:post_url",
        element: <CategoryBlogs />,
        loader: ({ params }) =>
          fetch(
            `https://theoutmaker.com/api/get/frontend/category-blogs/${params.id}`
          ),
      },
      {
        path: "/blog/:id/:post_url",
        element: <Blog />,
        loader: ({ params }) =>
          fetch(
            `https://theoutmaker.com/api/get/frontend/single-post/details/${params.id}`
          ),
      },
      {
        path: "/products/:id/:purl",
        element: <Product />,
        loader: ({ params }) =>
          fetch(`https://theoutmaker.com/api/get/category/single/${params.id}`),
      },
      {
        path: "/category-product/:id/:cateogry_url",
        element: <ProductCategory />,
        loader: ({ params }) =>
          fetch(`https://theoutmaker.com/api/get/category/single/${params.id}`),
      },

      {
        path: "/collection-product/:id/:collection_url",
        element: <ProductCollection />,
        loader: ({ params }) =>
          fetch(
            `https://theoutmaker.com/api/get/collection/single/${params.id}`
          ),
      },
      {
        path: "/product-details/:id/:purl",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`https://theoutmaker.com/api/get/product/single/${params.id}`),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/care-guide",
        element: <CareGuide />,
      },
      {
        path: "/sustainability",
        element: <Sustainability />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout-info",
        element: <CheckoutInfo />,
      },
      {
        path: "/checkout-info/status/:id",
        element: <PayStatus />,
      },
      {
        path: "/paypal/status",
        element: <PayStatusPaypal />,
      },
      {
        path: "/shipping-info",
        element: <ShippingInfo />,
      },
      {
        path: "/payment-info",
        element: <PaymentInfo />,
      },
      {
        path: "/reviews",
        element: <BuyerReview />,
      },
      {
        path: "/OrderConfirm",
        element: <OrderConfirm />,
      },
      {
        path: "/OrderInformation/:number",
        element: <OrderInformation />,
      },
      {
        path: "/TermsOfService",
        element: <TermsOfService />,
      },
      {
        path: "/Privacypolicy",
        element: <Privacypolicy />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        path: "/RefundPolicy",
        element: <RefundPolicy />,
      },
      {
        path: "/ShippingPolicy",
        element: <ShippingPolicy />,
      },
      {
        path: "/Brand",
        element: <Brand></Brand>,
      },
      {
        path: "/Care",
        element: <Care></Care>,
      },
      {
        path: "/FAQ",
        element: <FAQPage />,
      },
      {
        path: "/OrderList",
        element: <OrderList />,
      },
      {
        path: "/Account",
        element: <Account />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
