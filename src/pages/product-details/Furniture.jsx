import React, { useState } from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/furniture-slider1.png";
import slider2 from "../../assets/images/furniture-slider2.png";
import slider3 from "../../assets/images/furniture-slider3.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../../assets/css/furniture.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [slider1, slider2, slider3, slider1];

const Furniture = () => {
	const NextArrow = ({ onClick }) => {
		return (
			<div className='arrow next' onClick={onClick}>
				<FaArrowRight />
			</div>
		);
	};

	const PrevArrow = ({ onClick }) => {
		return (
			<div className='arrow prev' onClick={onClick}>
				<FaArrowLeft />
			</div>
		);
	};

	const [imageIndex, setImageIndex] = useState(0);

	const settings = {
		infinite: true,
		lazyLoad: true,
		speed: 300,
		dots: true,
		slidesToShow: 3,
		centerMode: true,
		centerPadding: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		beforeChange: (current, next) => setImageIndex(next),
	};

	return (
		<section
			className='py-20'
			style={{
				background:
					"linear-gradient( 180deg, rgba(64, 123, 255, 0.06) 0%, rgba(244, 247, 255, 0) 100% )",
			}}>
			<div className='container mx-auto px-10'>
				<h2 className='text-primary text-xl md:text-4xl font-semibold text-center'>
					Outdoor furniture that fits your space
				</h2>
				<div className='furniture-slider py-10'>
					<Slider {...settings}>
						{images.map((img, idx) => (
							<div
								className={idx === imageIndex ? "slide activeSlide" : "slide"}>
								<img src={img} alt={img} />
							</div>
						))}
					</Slider>
				</div>
			</div>
		</section>
	);
};

export default Furniture;
