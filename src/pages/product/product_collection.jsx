import React from "react";
import ProductHeader from "./ProductHeader";
import CollectionAllProducts from "./CollectionAllProducts";
import CollectionSlider from "./CollectionSlider";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { useLocation } from "react-router-dom";

const ProductCollection = () => {
	const location = useLocation()
	console.log(location.pathname.includes('collection-product/'));   
	return (
		<main>
			<CollectionAllProducts category={location.pathname.includes('collection-product/')} />
			{/* to generate a rnadom number when user will land on this page */}
			<UserInitialization/>
		</main>
	);
};

export default ProductCollection;
