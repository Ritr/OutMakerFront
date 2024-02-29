import React from "react";

const Video = () => {
	return (
		<div className='bg-gray-100'>
			<iframe
				style={{ height: "600px" }}
				className='w-full'
				src='https://www.youtube.com/embed/cHBqwj0Ed_I'
				frameBorder={0}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
			/>
			<div className='block md:flex justify-between text-black p-6'>
				<div className='basis-3/5'>
					<p className='text-xl font-normal'>We’re on Youtube</p>
					<h3 className='text-2xl md:text-5xl font-bold pt-2'>
						Watch Dream Home Makeover
					</h3>
				</div>
				<div className='basis-2/5 pt-2 md:pt-0'>
					<p className='text-sm md:text-lg font-light'>
						Join us for an in-depth look inside some of our favorite design
						projects, across four seasons, and our family life in Utah, as we
						work to make life beautiful for ourselves and our clients. See more
						&rarr;
					</p>
				</div>
			</div>
		</div>
	);
};

export default Video;
