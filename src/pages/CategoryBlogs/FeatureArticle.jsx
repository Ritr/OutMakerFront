import React from "react";
import feateImageLg from "../../assets/images/article-lg.png";
import articleUser1 from "../../assets/images/article-user-1.png";
import articleUser2 from "../../assets/images/article-user-2.png";
import articleUser3 from "../../assets/images/article-user-3.png";
import article1 from "../../assets/images/feature-article-1.png";
import article2 from "../../assets/images/feature-article-2.png";
import article3 from "../../assets/images/feature-article-3.png";

const articles = [
	{
		id: 1,
		title: "How to Furnish Your Small Outdoor Space for your Garden",
		image: article1,
		user: articleUser1,
		userName: "Ben Holland",
		date: "11/10/2019",
	},
	{
		id: 2,
		title: "Enchanting 200-Year-Old Walled Garden in Pennsylvania",
		image: article2,
		user: articleUser2,
		userName: "Mary Cury",
		date: "11/10/2020",
	},
	{
		id: 3,
		title:
			"SEE THIS HOUSE: Architect’s New Orleans Home in the Garden District",
		image: article3,
		user: articleUser3,
		userName: "Emily",
		date: "11/10/2023",
	},
];

const FeatureArticle = () => {
	return (
		<section className='block md:flex justify-between pb-10 gap-6'>
			<div className='basis-1/2 bg-gray-100'>
				<figure>
					<img src={feateImageLg} alt='Shoes' />
				</figure>
				<div className='p-4'>
					<h2 className='text-xl md:text-3xl font-semibold text-black'>
						How to Furnish Your Small Outdoor Space{" "}
					</h2>
					<p className='text-sm md:text-base font-light text-black py-4'>
						En an unknown printer took a galley of type and scrambled it to make
						a type specimen book. It has survived not only five centuries, but
						also the leap into electronic typesetting
					</p>
					<div className='flex items-center gap-10 text-base text-[#213343] font-normal'>
						<div className='flex items-center gap-2'>
							<img src={articleUser1} alt='' className='w-10' />
							<span>Ben Holland</span>
						</div>
						<span>8/25/2022</span>
					</div>
				</div>
			</div>

			<div className='basis-1/2 pt-8 md:pt-0'>
				<h4 className='text-2xl md:text-3xl font-bold text-primary border-b-4 border-primary'>
					Featured Articles
				</h4>

				{articles.map(article => (
					<div className='flex justify-between border-b-4 border-[#B8B8B8] py-4'>
						<div className='basis-2/3'>
							<h5 className='text-sm md:text-xl font-medium text-black'>
								{article.title}
							</h5>

							<div className='flex items-center justify-between md:justify-normal gap-[6px] md:gap-3 text-xs md:text-base text-[#213343] font-normal md:pt-3'>
								<div className='flex items-center gap-2'>
									<img src={article.user} alt='' className='w-10' />
									<span className=''>{article.userName}</span>
								</div>
								<div className='divider bg-[#213343] w-[2px] h-4'></div>
								<span>{article.date}</span>
							</div>
						</div>
						<div className='basis-1/3 pl-2 md:pl-0'>
							<img src={article.image} alt='' className='w-full h-full' />
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeatureArticle;
