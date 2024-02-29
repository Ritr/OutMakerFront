import React from 'react';
import image1 from '../../../src/assets/care/1.png';
import image2 from '../../../src/assets/care/2.png';
import image3 from '../../../src/assets/care/3.png';
import image4 from '../../../src/assets/care/4.png';
import image5 from '../../../src/assets/care/5.png';
import image6 from '../../../src/assets/care/6.png';
import image7 from '../../../src/assets/care/7.png';
import image8 from '../../../src/assets/care/8.png';
import image9 from '../../../src/assets/care/9.png';


const Care = () => {
    return (
            <div className='px-20'>
                <h1 className='text-5xl text-blue-950 text-center font-bold'>Sunbrella's Fabric Advantage</h1>
                
                <div className=' grid grid-cols sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 py-10 justify-center'>
                    <div>
                        <img src={image1} alt="" className='w-220 h-220 w-full' />
                        <h1 className='text-3xl text-blue-950 text-center font-bold'>UV resistant, non fading</h1>
                        <p className="text-center py-5">
                        Sunbrella functional fabric is made of Sunbrella fiber, which evenly distributes the color inside the fiber and will not fade even with bleach.
                        </p>
                    </div>
                    <div>
                        <img src={image2} alt="" className='w-220 h-220 w-full'/>
                        <h1 className='text-3xl text-blue-950 text-center font-bold'>Anti mold, easy to clean</h1>
                        <p className="text-center py-5">
                        Sunbrella fabric has the function of preventing mold and spots. If mold and spots are generated due to stains, all Sunbrella fabrics can be easily removed by using bleach.
                        </p>
                    </div>
                    <div>
                        <img src={image3} alt="" className='w-220 h-220 w-full'/>
                        <h1 className='text-3xl text-blue-950 text-center font-bold'>Bleachable cleaning</h1>
                        <p className="text-center py-5">
                        Sunbrella functional fabric is made of Sunbrella fiber, which evenly distributes the color inside the fiber and will not fade even with bleach.
                        </p>
                    </div>
                </div>

                <h1 className='text-5xl text-blue-950 text-center font-bold'>How to Clean Sunbrella</h1>
                    
                    <div className='flex items-center py-5'>
                        <div className=''>
                            <img src={image4} alt="" className='w-full' />
                        </div>
                        <div className='px-10'>
                            <h1 className='text-3xl text-blue-950 font-bold'>Step 1</h1>
                            <p className=" py-5">
                            Brush off floating dust.
                            </p>
                        </div>
                        
                    </div>
                    <div className='flex items-center py-5'> 
                        <div>
                            <img src={image5} alt="" className='w-full' />
                        </div>
                       <div className='px-10'> 
                            <h1 className='text-3xl text-blue-950  font-bold'>Step 2</h1>
                            <p className=" py-5">
                            Prepare cleaning solution and mild soapy water, such as Woolite or Dawn detergent.
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center py-5'>
                       <div>
                            <img src={image6} alt="" className='w-full' />
                       </div>
                        <div className='px-10'>
                            <h1 className='text-3xl text-blue-950  font-bold'>Step 3</h1>
                            <p className=" py-5">
                            Use a soft bristle brush for brushing.
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center py-5'>
                        <div>
                             <img src={image7} alt="" className='w-full' />
                        </div>
                       <div className='px-10'>
                            <h1 className='text-3xl text-blue-950  font-bold'>Step 3</h1>
                            <p className=" py-5">
                            Allow the cleaning solution to fully penetrate into the fabric.
                            </p>
                       </div>
                    </div>
                    <div className='flex items-center py-5'>
                        <div>
                            <img src={image8} alt="" className='w-full'/>
                        </div>
                       <div className='px-10'>
                            <h1 className='text-3xl text-blue-950 font-bold'>Step 5</h1>
                            <p className="py-5">
                            Thoroughly rinse until all soap residue is removed.
                            </p>
                       </div>
                    </div>
                    <div className='flex items-center py-5'>
                        <div>
                            <img src={image9} alt="" className='w-full'/>
                        </div>
                        <div className='px-10'>
                            <h1 className='text-3xl text-blue-950  font-bold'>Step 6</h1>
                            <p className="py-5">
                            Natural air drying
                            </p>
                        </div>
                    </div>
               
                
            </div>
       
    );
};

export default Care;