import React from "react";
import ProductHeader from "./ProductHeader";
import CategoryAllProducts from "./CategoryAllProducts";
import CollectionSlider from "./CollectionSlider";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { useLocation } from "react-router-dom";

const ProductCategory = () => {
	const location = useLocation()
	console.log(location.pathname.includes('category-product/'));   
	return (
		<main className="lg:max-w-[1600px] mx-auto">
			<CategoryAllProducts category={location.pathname.includes('category-product/')} />
			{/* to generate a rnadom number when user will land on this page */}
			<UserInitialization/>
		</main>
	);
};

export default ProductCategory;
