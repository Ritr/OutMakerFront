import React from "react";
import headerImage from "../../assets/images/all-blogs-banner4.jpg";

const AllBlogsHeader = () => {
	return (
		<header
  className='min-h-screen flex flex-col items-start justify-end p-8 md:p-20'
  style={{
    backgroundImage: `url(${headerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  }}
>
  <div className='border-b-4 border-white'>
    <h1 className='text-2xl md:text-5xl text-white font-semibold uppercase'>
      Mansion Living Concept
    </h1>
    <p className='pt-6 pb-2 text-white uppercase'>
      Hot staff, fun staff, new staff soon to be your staff
    </p>
  </div>
</header>


	);
};

export default AllBlogsHeader;
