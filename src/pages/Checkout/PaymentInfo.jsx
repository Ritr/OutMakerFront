import React from "react";
import image from "../../assets/images/cutter-sufa.png";
import visa from "../../assets/icons/visa.png";
import paypal from "../../assets/icons/paypal.png";
import express from "../../assets/icons/express.png";
import mastercard from "../../assets/icons/mastercard.png";
import { useForm } from "react-hook-form";
import left from '../../assets/images/left-icon.png';
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
const PaymentInfo = () => {
  // for payment
  const {
    register,
    getValues ,
    formState: { errors },
  } = useForm();
//   const onSubmit = (data) => console.log(data);
//   console.log(errors);

  const handlePayNow = () =>{
    const formData = getValues();
    console.log(formData);
  }
  return (
    <section className="container mx-auto px-2 md:px-10 py-10 md:py-20 text-primary">
      <>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* details part */}
          <div className="shadow-xl px-5 py-8 flex-1">
            <div>
              <h1 className="text-2xl font-semibold mb-5">Contact Information</h1>
              <div className="border-2 border-primary rounded-lg px-7 py-4">
                <div className="flex flex-col md:flex-row  md:items-center justify-between gap-2 md:gap-0">
                  <h3 className="text-[#B8B8B8]">Contact</h3>
                  <p className="text-primary">info@gamil.com</p>
                  <button className="btn btn-sm btn-primary text-white normal-case">
                    Change
                  </button>
                </div>
                <div className="h-[2px] bg-primary my-5"></div>
                <div className="flex flex-col md:flex-row  md:items-center justify-between gap-2 md:gap-0">
                  <h3 className="text-[#B8B8B8]">Ship to</h3>
                  <p className="text-primary">info@gamil.com</p>
                  <button className="btn btn-sm btn-primary text-white normal-case">
                    Change
                  </button>
                </div>
                <div className="h-[2px] bg-primary my-5"></div>
                <div className="flex flex-col md:flex-row  md:items-center justify-between gap-2 md:gap-0">
                  <h3 className="text-[#B8B8B8]">Method</h3>
                  <p className="text-primary">info@gamil.com</p>
                  <button className="btn btn-sm btn-primary text-white normal-case">
                    Change
                  </button>
                </div>
              </div>
            </div>
            {/* card details table */}
            <div>
              <h1 className="text-2xl font-semibold mt-10 mb-5">
              Payment
              </h1>
              <p className="mb-5">All transactions are secure and encrypted.</p>

              {/* row column */}
              <div className="overflow-x-auto">
                <table className="table border-2 border-primary">
                  <tbody className="border-2 border-primary">
                    {/* row 1 */}
                    <tr className="border-2 border-primary">
                      <td>
                        <div className="flex flex-col md:flex-row md:justify-between">
                          {/* check box */}
                          <form>
                            <div className="form-control">
                              <label className="label cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary"
                                />
                                <span className="label-text ml-5">
                                  Credit card
                                </span>
                              </label>
                            </div>
                          </form>
                          <div className="flex gap-1 basis-1/2 justify-end">
                            <img
                              src={visa}
                              alt=""
                              className="w-[40px] object-contain h-full"
                            />
                            <img
                              src={express}
                              alt=""
                              className="w-[40px] object-contain h-full"
                            />
                            <img
                              src={paypal}
                              alt=""
                              className="w-[40px] object-contain h-full"
                            />
                            <img
                              src={mastercard}
                              alt=""
                              className="w-[40px] object-contain h-full"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* row 2 */}
                    <tr className="border-2 border-primary">
                      <td>
                        <form className="grid grid-cols-1 gap-5">
                          <input
                            type="text"
                            className="input input-bordered border-primary w-full focus:outline-none"
                            placeholder="Card Number"
                            {...register("cardNum", { required: true })}
                          />
                          <input
                            type="text"
                            className="input input-bordered border-primary w-full focus:outline-none"
                            placeholder="Name on the card"
                            {...register("cardName", { required: true })}
                          />
                          <div className="flex flex-col md:flex-row gap-3">
                            <input
                              type="datetime"
                              className="input input-bordered border-primary w-full focus:outline-none"
                              placeholder="Epiration Date ( MM/YY )"
                              {...register("exDate", { required: true })}
                            />
                            <input
                              type="number"
                              className="input input-bordered border-primary w-full focus:outline-none"
                              placeholder="Security Code"
                              {...register("code", { required: true })}
                            />
                          </div>
                        </form>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
            {/* billing info */}
            <div>
              <h1 className="text-2xl font-semibold mt-10 mb-5">
              Billing Address
              </h1>
              <p className="mb-5">Select the address that matches your card or payment method.</p>

              {/* row column */}
              <div className="overflow-x-auto">
                <table className="table border-2 border-primary">
                  <tbody className="border-2 border-primary">
                   {/* row 1 */}
                   <tr className="border-2 border-primary">
                      <td>
                        <div>
                          {/* check box */}
                          <form>
                            <div className="form-control w-1/3">
                              <label className="label cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary"
                                />
                                <span className="label-text">
                                Use a different billing address
                                </span>
                              </label>
                            </div>
                          </form>
                        </div>
                      </td>
                    </tr>
                   {/* row 2 */}
                   <tr className="border-2 border-primary">
                      <td>
                        <div>
                          {/* check box */}
                          <form>
                            <div className="form-control w-[230px]">
                              <label className="label cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary"
                                />
                                <span className="label-text">
                                Same as shipping address
                                </span>
                              </label>
                            </div>
                          </form>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* billing info */}
            <div>
              <h1 className="text-2xl font-semibold mt-10 mb-5">
              Remember me
              </h1>
             
              {/* row column */}
              <div className="overflow-x-auto">
                <table className="table border-2 border-primary">
                  <tbody className="border-2 border-primary">
                   {/* row 1 */}
                   <tr className="border-2 border-primary">
                      <td>
                        <div>
                          {/* check box */}
                          <form>
                            <div className="form-control w-1/3">
                              <label className="label cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary"
                                />
                                <span className="label-text">
                                Use a different billing address
                                </span>
                              </label>
                            </div>
                          </form>
                        </div>
                      </td>
                    </tr>
                  
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-0 mt-14">
                <Link to='/shipping-info'>
                <button className="flex items-center gap-4">
                    <img src={left} alt="" className="w-[10px]"/>
                    <span>Return to shipping</span>
                </button>
                </Link>
                <Link to='' className="btn btn-primary normal-case">Pay Now</Link>
              </div>
          </div>
          {/* payment info  */}
          <div className="px-5 py-16 shadow-xl rounded-md w-full lg:w-[550px]">
            {/* product card */}
            <div>
              <div className="flex flex-col md:flex-row lg:items-center justify-between mb-3">
                <div className="flex flex-col md:flex-row lg:items-center gap-4">
                  <figure className="w-full md:w-[100px] h-[100px]">
                    <img
                      src={image}
                      alt=""
                      className="object-fill w-full h-full rounded"
                    />
                  </figure>
                  <div className="space-y-0 lg:space-y-2">
                    <p>Ludlow Small Sectional Set</p>
                    <p>Glacier / 90 Degree Corner / Coffee Table</p>
                  </div>
                </div>
                <p className="text-end lg:text-start">$7,500</p>
              </div>
              <div className="flex flex-col md:flex-row lg:items-center justify-between mb-3">
                <div className="flex flex-col md:flex-row lg:items-center gap-4">
                  <figure className="w-full md:w-[100px] h-[100px]">
                    <img
                      src={image}
                      alt=""
                      className="object-fill w-full h-full rounded"
                    />
                  </figure>
                  <div className="space-y-0 lg:space-y-2">
                    <p>Ludlow Small Sectional Set</p>
                    <p>Glacier / 90 Degree Corner / Coffee Table</p>
                  </div>
                </div>
                <p className="text-end lg:text-start">$7,500</p>
              </div>
            </div>
            {/* divider */}
            <div className="h-[2px] bg-primary mb-7"></div>
            {/* amount */}
            <div>
              <div className="flex lg:items-center justify-between mb-2">
                <p>Subtotal</p>
                <p>$4,780.00</p>
              </div>
              <div className="flex lg:items-center justify-between mb-2">
                <p>Shipping</p>
                <p className="text-[#B8B8B8]">Calculated at next step</p>
              </div>
              <div className="flex lg:items-center justify-between mb-2">
                <p>Estimatd Tax</p>
                <p>$394.35</p>
              </div>
            </div>
            {/* divider */}
            <div className="h-[2px] bg-primary mb-7"></div>
            {/* total */}
            <div className="flex lg:items-center justify-between mb-2 text-xl font-bold">
              <p>Total Cost</p>
              <p>$394.35</p>
            </div>
          </div>
        </div>
      </>

      {/* to generate a rnadom number when user will land on this page */}
      <UserInitialization/>
    </section>
  );
};

export default PaymentInfo;
