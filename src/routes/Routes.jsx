import React from "react";
import { createBrowserRouter } from "react-router-dom";
const Main = React.lazy(() => import("../layouts/Main"));
const About = React.lazy(() => import("../pages/About/About/About"));
const CareGuide = React.lazy(() =>
  import("../pages/CareGuide/CareGuide/CareGuide")
);
const Shipping = React.lazy(() =>
  import("../pages/Shipping/Shipping/Shipping")
);
const Sustainability = React.lazy(() =>
  import("../pages/Sustainability/Sustainability/Sustainability")
);
const Home = React.lazy(() => import("../pages/home/Home"));
const AllBlogs = React.lazy(() => import("../pages/all-blogs/AllBlogs"));
const CategoryBlogs = React.lazy(() =>
  import("../pages/CategoryBlogs/CategoryBlogs")
);
const Blog = React.lazy(() => import("../pages/blog/Blog"));
const Product = React.lazy(() => import("../pages/product/product"));
const ProductCategory = React.lazy(() =>
  import("../pages/product/product_category")
);
const ProductCollection = React.lazy(() =>
  import("../pages/product/product_collection")
);
const ProductDetails = React.lazy(() =>
  import("../pages/product-details/ProductDetails")
);
const Contact = React.lazy(() => import("../pages/contact/Contact"));
const Collections = React.lazy(() =>
  import("../pages/collections/collections")
);
const Checkout = React.lazy(() => import("../pages/Checkout/Checkout"));
const CheckoutInfo = React.lazy(() => import("../pages/Checkout/CheckoutInfo"));
const PayStatus = React.lazy(() => import("../pages/Checkout/PayStatus"));
const PayStatusPaypal = React.lazy(() =>
  import("../pages/Checkout/PayStatusPaypal")
);
const ShippingInfo = React.lazy(() => import("../pages/Checkout/ShippingInfo"));
const PaymentInfo = React.lazy(() => import("../pages/Checkout/PaymentInfo"));
// const TestPayement = React.lazy(() => import("../pages/Checkout/TestPayement"));
const BuyerReview = React.lazy(() =>
  import("../pages/product-details/BuyerReview")
);
const OrderInformation = React.lazy(() =>
  import("../pages/Checkout/OrderInformation")
);
const OrderConfirm = React.lazy(() => import("../pages/Checkout/OrderConfirm"));
/*
<Route path='/' element={<Home />} />
				<Route path='/collections' element={<Collections />} />
				<Route path='/all-blogs' element={<AllBlogs />} />
				<Route path='/blog' element={<Blog />} />
				<Route path='/product' element={<Product />} />
				<Route path='/product-details' element={<ProductDetails />} />
				<Route path='/contact' element={<Contact />} />

*/

const TermsOfService = React.lazy(() =>
  import("../pages/policy/TermsOfService")
);
const Privacypolicy = React.lazy(() => import("../pages/policy/Privacypolicy"));
const AboutUs = React.lazy(() => import("../pages/policy/AboutUs"));
const ContactUs = React.lazy(() => import("../pages/policy/ContactUs"));
const RefundPolicy = React.lazy(() => import("../pages/policy/RefundPolicy"));
const ShippingPolicy = React.lazy(() =>
  import("../pages/policy/ShippingPolicy")
);
const Brand = React.lazy(() => import("../pages/Brand/Brand"));
const Care = React.lazy(() => import("../pages/Care/Care"));
const FAQPage = React.lazy(() => import("../pages/all-faqs/FAQPage"));
const OrderList = React.lazy(() => import("../pages/all-orders/OrderList"));
const Account = React.lazy(() => import("../pages/account/account"));
const NotFound = React.lazy(() => import("../NotFound"));

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
