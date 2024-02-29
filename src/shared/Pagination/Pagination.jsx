import React from "react";

const Pagination = () => {
	return (
		<div className='flex flex-col lg:flex-row justify-between items-center'>
			<nav
				aria-label='Pagination'
				className='flex justify-center items-center text-gray-600 mt-8 lg:mt-0 font-semibold'>
				<a href='#' className='p-2 mr-0 hover:bg-[#F5F6FF] flex text-[#879bb2]'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					<p className='text-sm md:text-base pt-1 md:pt-0'>Previous</p>
				</a>
				<a
					href='#'
					className='px-2 md:px-4 py-2 bg-[#F5F6FF] hover:bg-[#F5F6FF] border-r-2 border-[#F5F6FF] text-primary text-sm'>
					1
				</a>
				<a
					href='#'
					className='px-2 md:px-4 py-2 border-r-2 border-[#F5F6FF] text-primary text-sm'>
					2
				</a>
				{/* <a
					href='#'
					className='px-2 md:px-4 py-2 hover:bg-[#F5F6FF] border-r-2 border-[#F5F6FF] text-primary text-sm'>
					3
				</a> */}
				<a
					href='#'
					className='px-2 md:px-4 py-2 hover:bg-[#F5F6FF] border-r-2 border-[#F5F6FF] text-primary text-sm'>
					...
				</a>
				<a
					href='#'
					className='px-2 md:px-4 py-2 hover:bg-[#F5F6FF] border-r-2 border-[#F5F6FF] text-primary text-sm'>
					20
				</a>
				<a href='#' className='p-2 ml-0 hover:bg-[#F5F6FF] flex text-primary'>
					<p className='text-sm md:text-base pt-1 md:pt-0'>Next</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</a>
			</nav>
		</div>
	);
};

export default Pagination;
