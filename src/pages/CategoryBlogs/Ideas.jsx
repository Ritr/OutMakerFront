import React from "react";
import idea1 from "../../assets/images/ideas-1.png";
import idea2 from "../../assets/images/ideas-2.png";
import idea3 from "../../assets/images/ideas-3.png";

const articles = [
	{
		id: 1,
		image: idea1,
		title: "OUTDOOR",
		details: "Inside the Catalogue | Marigold Color Story Inside the Catalogue",
	},
	{
		id: 2,
		image: idea2,
		title: "LIVING",
		details: "Earthy Interior Moments from Studio McGee",
	},
	{
		id: 3,
		image: idea3,
		title: "RESORT",
		details: "Our Favorite Spaces for the Littles Where it gets Amazing",
	},
];

const Ideas = () => {
	return (
		<section className='py-16'>
			<h4 className='text-2xl md:text-3xl font-bold text-primary border-b-4 border-primary'>
				Style and Design Ideas
			</h4>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{articles.map(article => (
					<div className='border-b-4 border-[#B8B8B8] my-6'>
						<img src={article.image} alt='' />
						<div className='h-36'>
							<h4 className='text-2xl font-bold text-black pt-2'>
								{article.title}
							</h4>
							<p className='text-xl font-normal text-black py-2'>
								{article.details}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Ideas;
