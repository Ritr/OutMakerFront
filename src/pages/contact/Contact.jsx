import React from "react";
import PageNav from "./PageNav";
import Network from "../../shared/Network/Network";
import img1 from "../../assets/images/contact-page1.png";
import img2 from "../../assets/images/cotact-page2.png";
import SingleBlog from "../../shared/Blog/SingleBlog";
import ContactFrom from "./ContactFrom";
import ShowRooms from "./ShowRooms";
import mic from "../../assets/images/mic.png";

const Contact = () => {
	return (
		<main className='container mx-auto px-2 md:px-10 relative'>
			<PageNav />
			<div className='text-center pt-10 md:pt-20'>
				<h2 className='text-4xl font-semibold text-black'>Contact</h2>
				<h4 className='text-3xl font-medium text-[#002B5B] pt-2'>OUTMAKER</h4>
				<p className='py-4 md:py-10 text-base font-light'>
					Outmaker offers 9 collections of outdoor furniture with unic designs
					which will meet your special needs
				</p>
			</div>

			<SingleBlog
				contactPage={true}
				image={img1}
				title='Headquarter'
				name='France'
				description="The cushioning concept revisited, tables with their ergonomic
					waist-high tops. An innovative and modular approach to outdoor
					furniture.Let's push the boundaries in order to make life more fun!"
			/>
			<SingleBlog
				contactPage={true}
				image={img2}
				title='Factory'
				name='China'
				className='order-last'
				description="The cushioning concept revisited, tables with their ergonomic
					waist-high tops. An innovative and modular approach to outdoor
					furniture.Let's push the boundaries in order to make life more fun!"
			/>

			<ContactFrom />
			<ShowRooms />

			<Network />

			<div className='absolute right-0 bottom-[0px]'>
				<img src={mic} alt='' className='w-3/4 md:w-full' />
			</div>
			{/* to generate a rnadom number when user will land on this page */}
		</main>
	);
};

export default Contact;
