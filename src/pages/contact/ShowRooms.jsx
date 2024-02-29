import React from "react";
import Button from "../../shared/Button/Button";
import { PiMapPinLineFill } from "react-icons/pi";
import room1 from "../../assets/images/room1.png";
import room2 from "../../assets/images/room2.png";
import room3 from "../../assets/images/room3.png";

const rooms = [
	{
		id: 1,
		title: "FLAGSHIP STORE",
		location: "Miami, USA",
		address: "8803 NW, 23rd StreetDoral FL 33172",
		phone1: "T. +1 786 391 0274",
		phone2: "T. +1 786 353 9108",
		site: "https://www.outmaker.com/us/",
		email: "infousa@outmaker.com",
		image: room1,
	},
	{
		id: 2,
		title: "SHOWROOM",
		location: "Los Angeles, USA",
		address: "8803 NW, 23rd StreetDoral FL 33172",
		phone1: "T. +1 786 391 0274",
		phone2: "T. +1 786 353 9108",
		site: "https://www.outmaker.com/us/",
		email: "infousa@outmaker.com",
		image: room2,
	},
	{
		id: 3,
		title: "SHOWROOM",
		location: "Shanghai, China",
		address: "8803 NW, 23rd StreetDoral FL 33172",
		phone1: "T. +1 786 391 0274",
		phone2: "T. +1 786 353 9108",
		site: "https://www.outmaker.com/us/",
		email: "infousa@outmaker.com",
		image: room3,
	},
];

const ShowRooms = () => {
	return (
		<section className='py-10'>
			<div className='text-left border-b-4 border-primary'>
				<h2 className='text-primary text-xl md:text-3xl font-bold pb-3'>
					Showrooms
				</h2>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-2 md:pt-10 gap-4'>
				{rooms.map((room, index) => (
					<div key={index} className='my-4 md:my-0 border-b-4 pb-6'>
						<img src={room.image} alt='' />
						<div className='flex flex-col '>
							<h4 className='text-xl font-normal text-black tracking-wider pt-2'>
								{room.title}
							</h4>
							<h2 className='text-4xl font-semibold text-black'>
								{room.location}
							</h2>

							<div className='py-4 font-light text-lg'>
								<p>{room.address}</p>
								<a href='tel:1 786 391 0274' className='block pt-4'>
									{room.phone1}
								</a>
								<a href='tel:1 786 353 9108' className='block pb-4'>
									{room.phone2}
								</a>
								<a
									href='https://www.outmaker.com/us/'
									className='block underline'
									target='_blank'
									rel='noreferrer'>
									{room.site}
								</a>
								<a
									href='mailto: infousa@outmaker.com'
									className='block underline'>
									{room.email}
								</a>
							</div>

							{/* <Button
								className='btn btn-primary text-primary mx-auto btn-outline rounded-full border-2 capitalize hover:text-white gap-6 font-medium'
								style={{ fontSize: "24px !important" }}>
								View Map <PiMapPinLineFill className='ms-2' />
							</Button> */}

							<p className='btn hover:bg-primary text-primary mx-auto btn-outline rounded-full border-2 capitalize hover:text-white gap-6 font-medium text-xl'>
								View Map <PiMapPinLineFill className='ms-2' />
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ShowRooms;
