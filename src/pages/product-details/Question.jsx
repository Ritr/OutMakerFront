import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";

const Question = () => {
	return (
		<section>
			<div className='border-[#E3E3E3] bg-[#fefefe] border-[1px] rounded-lg p-4 mb-6'>
				<p className='text-base text-primary font-medium'>
					QUESTION- How to buy furniture on budget? -{" "}
					<span className='text-sm font-normal text-[#363434]'>
						(Hosen Rahman){" "}
					</span>
				</p>
				<div className='flex border-l-[1px] mt-4'>
					<p className='text-base text-primary font-medium ps-2'>
						ANSWER-{" "}
						<span className='text-[#666666] font-normal text-base'>
							Furniture provides a place to relax in your home.
						</span>{" "}
						<br />
						<span className='ps-20 text-[#666666] font-normal text-base'>
							But not only does furniture give you a spot.
						</span>
					</p>
				</div>
				<div className='block md:flex items-center justify-between'>
					<div className='block lg:flex items-center gap-6'>
						<div className='flex items-center gap-4 text-primary py-4 md:pb-0'>
							<p>Is it Helpful?</p>
							<div className='border-primary bg-primary text-white rounded-full w-9 h-9 border-[1px] p-2 cursor-pointer'>
								<BiLike />
							</div>
							<div className='border-primary hover:bg-primary hover:text-white rounded-full w-9 h-9 border-[1px] p-2 cursor-pointer'>
								<BiDislike />
							</div>
						</div>
					</div>

					<p className='text-end text-[#666666] font-normal text-base'>
						12-05-2023
					</p>
				</div>
			</div>
			<div className='border-[#E3E3E3] bg-[#fefefe] border-[1px] rounded-lg p-4 mb-6'>
				<p className='text-base text-primary font-medium'>
					QUESTION- How to buy furniture on budget? -{" "}
					<span className='text-sm font-normal text-[#363434]'>
						(Hosen Rahman){" "}
					</span>
				</p>
				<div className='flex border-l-[1px] mt-4'>
					<p className='text-base text-primary font-medium ps-2'>
						ANSWER-{" "}
						<span className='text-[#666666] font-normal text-base'>
							Furniture provides a place to relax in your home.
						</span>{" "}
						<br />
						<span className='ps-20 text-[#666666] font-normal text-base'>
							But not only does furniture give you a spot.
						</span>
					</p>
				</div>
				<div className='block md:flex items-center justify-between'>
					<div className='block lg:flex items-center gap-6'>
						<div className='flex items-center gap-4 text-primary py-4 md:pb-0'>
							<p>Is it Helpful?</p>
							<div className='border-primary bg-primary text-white rounded-full w-9 h-9 border-[1px] p-2 cursor-pointer'>
								<BiLike />
							</div>
							<div className='border-primary hover:bg-primary hover:text-white rounded-full w-9 h-9 border-[1px] p-2 cursor-pointer'>
								<BiDislike />
							</div>
						</div>
					</div>

					<p className='text-end text-[#666666] font-normal text-base'>
						12-05-2023
					</p>
				</div>
			</div>
		</section>
	);
};

export default Question;
