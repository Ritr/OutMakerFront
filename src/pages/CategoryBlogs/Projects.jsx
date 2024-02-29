import React from "react";
import project1 from "../../assets/images/project-1.png";
import project2 from "../../assets/images/project-2.png";
import project3 from "../../assets/images/project-3.png";

const articles = [
	{
		id: 1,
		image: project1,
		title: "RESORT",
		details: "Shea’s Guide to All Things Vintage",
	},
	{
		id: 2,
		image: project2,
		title: "CAFE",
		details: "How to Transition Your Home for Warmer Weather",
	},
	{
		id: 3,
		image: project3,
		title: "HOTEL",
		details: "Spec Home Webisode 06 | Bedrooms and Bathrooms",
	},
];

const Projects = () => {
	return (
		<section className='pt-14'>
			<h4 className='text-2xl md:text-3xl font-bold text-primary border-b-4 border-primary'>
				Outdoor Projects
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

export default Projects;
