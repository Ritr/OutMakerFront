import React from "react";
import user1 from "../../assets/images/review-user-1.png";
import user2 from "../../assets/images/review-user-2.png";
import user3 from "../../assets/images/review-user-3.png";
import reviewImg1 from "../../assets/images/review-img1.png";
import reviewImg2 from "../../assets/images/review-img2.png";
import reviewImg3 from "../../assets/images/review-img3.png";
import {
	SlSocialFacebook,
	SlSocialInstagram,
	SlSocialLinkedin,
	SlSocialTwitter,
} from "react-icons/sl";
import { BiLike, BiDislike } from "react-icons/bi";
import Pagination from "../../shared/Pagination/Pagination";

const reviews = [
	{
		id: 1,
		img: user1,
	},
	{
		id: 2,
		img: user2,
	},
	{
		id: 3,
		img: user3,
	},
];

const Review = () => {
	return (
		<section>
			{reviews.map(review => (
				<div className='border-[#E3E3E3] bg-[#fefefe] border-[1px] rounded-lg p-4 mb-6'>
					<div className='block md:flex items-center gap-4'>
						<img src={review.img} alt='' className='h-[55px] w-[55px] mb-1' />
						<div className=''>
							<div className='flex gap-2 text-primary items-center'>
								<h5 className='uppercase text-sm md:text-xl font-semibold'>
									Hosen Rahman
								</h5>
								<div className='w-[1px] h-[20px] bg-primary'></div>
								<p className='text-xs md:text-sm font-semibold'>
									Product-{" "}
									<span className='underline font-normal'>
										Eden Sofa Set with Fixed Chairs
									</span>
								</p>
							</div>
							<div className='flex items-center gap-4'>
								<div className='rating'>
									<input
										type='radio'
										name='rating-2'
										className='mask mask-star-2 bg-orange-400'
									/>
									<input
										type='radio'
										name='rating-2'
										className='mask mask-star-2 bg-orange-400'
									/>
									<input
										type='radio'
										name='rating-2'
										className='mask mask-star-2 bg-orange-400'
									/>
									<input
										type='radio'
										name='rating-2'
										className='mask mask-star-2 bg-orange-400'
									/>
									<input
										checked
										type='radio'
										name='rating-2'
										className='mask mask-star-2 bg-orange-400'
									/>
								</div>
								<p className='text-[#151414] font-semibold text-xs md:text-xl'>
									5.00
								</p>
							</div>
						</div>
					</div>
					<p className='font-normal text-xs md:text-base text-[#666666] leading-relaxed pt-2 ps-0 md:ps-16'>
						HipVan is proud to be founded in Singapore. Like you, we're young
						adults who care about creating an inspiring home we call our own.
						The problem of limited furnishing options, high retail mark-ups and
						low quality products here inspired us to build HipVan in the country
						we call home.
					</p>
					<div className='flex items-center gap-2 pt-4 ps-0 md:ps-16 '>
						<img src={reviewImg1} alt='' className='w-1/3 md:w-1/5 md:h-1/5' />
						<img src={reviewImg2} alt='' className='w-1/3 md:w-1/5 md:h-1/5' />
						<div className='relative w-1/3 md:w-1/5 md:h-1/5'>
							<img src={reviewImg3} alt='' className='' />
							<p className='absolute text-xs md:text-sm text-primary font-normal underline top-[40%] left-[25%]'>
								More Image
							</p>
						</div>
					</div>

					<div className='block md:flex items-center justify-between'>
						<div className='block lg:flex items-center ps-0 md:ps-16 gap-6'>
							<div className='flex items-center gap-4 text-primary py-4 md:pb-0'>
								<p>Is it Helpful?</p>
								<div className='border-primary bg-primary text-white rounded-full w-9 h-9 border-[1px] p-2 cursor-pointer'>
									<BiLike />
								</div>
								<div className='border-primary hover:bg-primary hover:text-white rounded-full w-9 h-9 border-[1px] p-2 cursor-pointer'>
									<BiDislike />
								</div>
							</div>

							<div className='w-0 md:w-[1px] h-0 md:h-[20px] bg-primary mt-4'></div>

							<div className='flex items-center flex-wrap md:flex-nowrap gap-4 text-primary py-4 md:pb-0'>
								<p>Share On:</p>
								<div className='border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer'>
									<SlSocialFacebook />
								</div>
								<div className='border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer'>
									<SlSocialTwitter />
								</div>
								<div className='border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer'>
									<SlSocialLinkedin />
								</div>
								<div className='border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer'>
									<SlSocialInstagram />
								</div>
							</div>
						</div>

						<p className='text-end text-[#666666] font-normal text-base'>
							12-05-2023
						</p>
					</div>
				</div>
			))}

			<div className='py-10'>
				<Pagination />
			</div>
		</section>
	);
};

export default Review;
