import React from 'react';
import shopPay from "../assets/images/shop-pay.png";
import gPay from "../assets/images/gpay.png";
const PaymentButtons = () => {
    return (
        <>
            <div className="flex items-center gap-2">
                  <button className="btn bg-[#724DDC] w-1/2">
                    <figure className="w-[124px] h-[30px]">
                      <img
                        src={shopPay}
                        alt=""
                        className="object-contain w-full h-full"
                      />
                    </figure>
                  </button>
                  <button className="btn bg-black w-1/2">
                    <figure className="w-[64px]">
                      <img
                        src={gPay}
                        alt=""
                        className="object-contain w-full h-full"
                      />
                    </figure>
                  </button>
                </div>
        </>
    );
};

export default PaymentButtons;