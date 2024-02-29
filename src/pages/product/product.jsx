import React from "react";
import ProductHeader from "./ProductHeader";
import AllProducts from "./AllProducts";
import CollectionSlider from "./CollectionSlider";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { useLocation } from "react-router-dom";

const Product = () => {
	const location = useLocation()
	console.log(location.pathname.includes('category-product/'));   
	return (
		<main>
			<AllProducts category={location.pathname.includes('category-product/')} />
			{/* to generate a rnadom number when user will land on this page */}
			<UserInitialization/>
		</main>
	);
};

export default Product;
