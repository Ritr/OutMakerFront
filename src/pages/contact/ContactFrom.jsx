import React from "react";
import Button from "../../shared/Button/Button";

const ContactFrom = () => {
	return (
		<div className='py-2 md:py-10'>
			<h4 className='font-bold text-3xl text-primary border-b-4 border-primary w-max mx-auto'>
				CONTACT US
			</h4>

			<form action='' className='w-full md:w-9/12 mx-auto pt-10'>
				<input
					type='text'
					placeholder='Full Name *'
					className='input input-bordered input-primary w-full border-2 text-[#B8B8B8] mb-4'
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-x-4'>
					<select className='select select-primary border-2 text-[#B8B8B8] mb-4'>
						<option disabled selected>
							Country *
						</option>
						<option>Bangladesh</option>
						<option>India</option>
					</select>
					<input
						type='text'
						placeholder='Province / State '
						className='input input-bordered input-primary w-full border-2 text-[#B8B8B8] mb-4'
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-x-4'>
					<input
						type='text'
						placeholder='City'
						className='input input-bordered input-primary w-full border-2 text-[#B8B8B8] mb-4'
					/>
					<input
						type='text'
						placeholder='Phone *'
						className='input input-bordered input-primary w-full border-2 text-[#B8B8B8] mb-4'
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-x-4'>
					<input
						type='text'
						placeholder='Email *'
						className='input input-bordered input-primary w-full border-2 text-[#B8B8B8] mb-4'
					/>
					<select className='select select-primary border-2 text-[#B8B8B8] mb-4'>
						<option disabled selected>
							Profile *
						</option>
						<option>Man</option>
						<option>Woman</option>
					</select>
				</div>
				<textarea
					className='textarea textarea-primary w-full border-2 text-[#B8B8B8] textarea-lg'
					rows='5'
					placeholder='Comment'></textarea>

				<div className='form-control w-full pt-4'>
					<label className='label cursor-pointer text-sm font-normal mr-auto'>
						<input type='checkbox' className='checkbox checkbox-primary me-4' />
						<span className='label-text'>
							I have read and accept the{" "}
							<a href='#' className='underline'>
								privacy policy.
							</a>
							*
						</span>
					</label>
				</div>
				<div className='form-control w-full pb-4'>
					<label className='label cursor-pointer text-sm font-normal mr-auto'>
						<input type='checkbox' className='checkbox checkbox-primary me-4' />
						<span className='label-text'>
							I want to subscribe to the newsletter.
						</span>
					</label>
				</div>

				<Button className='btn btn-primary w-full text-white'>SEND</Button>
			</form>
		</div>
	);
};

export default ContactFrom;
