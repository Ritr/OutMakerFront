import React, { useState } from "react";
import sofa from "../../assets/images/cutter-sufa.png";
import slider1 from "../../assets/images/furniture-slider1.png";
import slider2 from "../../assets/images/furniture-slider2.png";
import slider3 from "../../assets/images/furniture-slider3.png";
import weatherSlider from "../../assets/images/weather-slider.png";
import "../../assets/css/weather.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const sliders = [slider1, slider2, slider3, weatherSlider];

const Weather = () => {
	const [firstSlide, setFristSlide] = useState(0);
	const [secondSlide, setSecondSlide] = useState(1);
	const [lastSlide, setLastSlide] = useState(2);
	const [indexNumber, setIndexNumber] = useState(3);

	const nextSlide = () => {
		if (firstSlide === 3) {
			setFristSlide(0);
		} else {
			setFristSlide(index => index + 1);
		}
		if (secondSlide === 3) {
			setSecondSlide(0);
		} else {
			setSecondSlide(index => index + 1);
		}
		if (lastSlide === 3) {
			setLastSlide(0);
		} else {
			setLastSlide(index => index + 1);
		}

		if (indexNumber === 3) {
			setIndexNumber(0);
		} else {
			setIndexNumber(index => index + 1);
		}
	};

	const prevSlide = () => {
		if (firstSlide === 0) {
			setFristSlide(3);
		} else {
			setFristSlide(index => index - 1);
		}

		if (secondSlide === 0) {
			setSecondSlide(3);
		} else {
			setSecondSlide(index => index - 1);
		}

		if (lastSlide === 0) {
			setLastSlide(3);
		} else {
			setLastSlide(index => index - 1);
		}

		if (indexNumber === 0) {
			setIndexNumber(3);
		} else {
			setIndexNumber(index => index - 1);
		}
	};

	return (
		<section className='container px-3 md:px-10 mx-auto'>
			<div className='header'>
				<img src={sofa} alt='' />
				<p className='text-primary text-xl font-normal py-6 leading-relaxed'>
					Enjoy indoor comfort outside. Stylish and durably designed from
					All-Weather Wicker, Outer’s modular patio furniture invites you to
					relax on luxuriously comfortable memory foam cushions.
				</p>
			</div>

			<div className='weather-slider pb-20'>
				<div className='grid grid-cols-1 md:grid-cols-2 items-center gap-2'>
					<div className='grid grid-cols-3 gap-2'>
						<div className=''>
							<img
								src={sliders[firstSlide]}
								alt=''
								className='h-[70vh] object-cover rounded'
							/>
						</div>
						<div className=''>
							<img
								src={sliders[secondSlide]}
								alt=''
								className='h-[70vh] object-cover rounded'
							/>
						</div>
						<div className=''>
							<img
								src={sliders[lastSlide]}
								alt=''
								className='h-[70vh] object-cover rounded'
							/>
						</div>
					</div>
					<div className=''>
						<img
							style={{ transition: "transform 300ms" }}
							src={sliders[indexNumber]}
							alt=''
							className='h-[70vh] object-cover rounded'
						/>
					</div>
				</div>

				<div className='flex justify-between items-center pt-10'>
					<div className='flex gap-2'>
						<div className='bg-[#D9D9D9] h-1 w-1 rounded-full'></div>
						<div className='bg-primary h-1 w-2 rounded-full'></div>
						<div className='bg-[#D9D9D9] h-1 w-1 rounded-full'></div>
					</div>
					<div className='bg-[#d5dfff] h-[2px] w-full mx-10'></div>
					<div className='flex gap-4'>
						<button
							onClick={() => prevSlide()}
							className='bg-white border-[1px] rounded-full border-primary p-2 text-primary hover:text-white hover:bg-primary cursor-pointer'>
							<AiOutlineArrowLeft className='' />
						</button>
						<button
							onClick={() => nextSlide()}
							className='bg-white border-[1px] rounded-full border-primary p-2 text-primary hover:text-white hover:bg-primary cursor-pointer'>
							<AiOutlineArrowRight className='' />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Weather;
