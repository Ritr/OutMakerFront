import React from 'react';
import SocialShare from '../../components/SocialShare/SocialShare';

const ProductQuestions = () => {
    
    return (
        <>
        {/* container */}
           <div className='space-y-[20px] border rounded-xl px-10 py-7 mb-10'>
            {/* question */}
            <p className='text-primary font-medium md:pl-4'>
                <span className='uppercase text-lg md:text-[22px]'>Question-</span>
                <span className='text-xl md:text-xl'> How to buy furniture on budget? </span> 
                <span className='text-sm text-[#363434]'>- (Hosen Rahman)</span>
            </p>
            {/* answer */}
            <div className='flex flex-col md:flex-row items-start gap-3 border-l md:ml-10 pl-3 md:pl-7'>
                <p className='text-xl md:text-[22px] font-medium text-primary uppercase'>Answer- </p>
                <p className='lg:w-1/2'>Furniture provides a place to relax in your
                    home. But not only does furniture give you a spot.</p>
            </div>
             {/* share and date  */}
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <SocialShare/>
            <p>12-05-2023</p>
          </div>
           </div>
        </>
    );
};

export default ProductQuestions;