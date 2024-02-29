import React from "react";
import { Link } from "react-router-dom";

const PageNav = () => {
	return (
		<nav className='py-4'>
			<ul className='flex text-sm text-[#000000] font-normal'>
				<li className='me-6 pb-1 border-b-2 border-b-black'>
					<Link to='/'>
					Home
					</Link>
				</li>
				<li className='font-semibold'>Collections</li>
			</ul>
		</nav>
	);
};

export default PageNav;
