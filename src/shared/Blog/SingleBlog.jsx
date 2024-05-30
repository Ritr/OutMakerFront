import React from "react";
import { PiMapPinLineFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const SingleBlog = ({
	name,
	description,
	image,
	className,
	contactPage,
	title,
	id,
	category
}) => {
	return (
		<div className='block md:flex items-center my-10 md:my-0'>
			<div className={`basis-1/2 ${className}`}>
				<img src={image} alt='' className="md:h-[500px] w-full object-cover" />
			</div>
			<div className='basis-1/2 text-center py-10 px-10 flex flex-col items-center'>
				<h4 className='hidden md:block text-xl lg:text-2xl font-medium text-black tracking-wider'>
					{contactPage ? title : "COLLECTION"}
				</h4>
				<h2 className='text-2xl uppercase md:normal-case md:text-3xl lg:text-5xl font-medium text-black'>{name}</h2>

				{contactPage ? (
					<div className='py-8 font-light text-lg'>
						<p>8803 NW, 23rd StreetDoral FL 33172 </p>
						<a href='tel:1 786 391 0274' className='block pt-4'>
							T. +1 786 391 0274
						</a>
						<a href='tel:1 786 353 9108' className='block pb-4'>
							T. +1 786 353 9108
						</a>
						<a
							href='https://www.outmaker.com/us/'
							className='block underline'
							target='_blank'
							rel='noreferrer'>
							https://www.outmaker.com/us/
						</a>
						<a href='mailto: infousa@outmaker.com' className='block underline'>
							infousa@outmaker.com
						</a>
					</div>
				) : (
					<p className='py-6 text-sm font-light text-black leading-6'>
						{description}
					</p>
				)}

				{contactPage ? (
					<p className='btn hover:bg-primary text-primary mx-auto btn-outline rounded-full border-2 capitalize hover:text-white gap-6 font-medium text-xl'>
						View Map <PiMapPinLineFill className='ms-2' />
					</p>
				) : (
					<Link to={`/${!category ? "collection-product" : "category-product"}/${id}/${name}`}>
					<button className='hidden md:block btn border-primary text-primary hover:text-white hover:bg-primary btn-outline rounded-full border-2 capitalize'>
						DISCOVER
					</button>
					<button className='bg-[#ffffff] text-black md:hidden px-8 py-2 border border-black rounded-full '>
						DISCOVER
					</button>
					</Link>
					
				)}
			</div>
		</div>
	);
};

export default SingleBlog;

// https://api.theoutmaker.com.au/api/get/category/single/