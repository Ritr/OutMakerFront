// * Working when someone clicking the 'continue to shipping' twice

import React, { useEffect, useState } from "react";
import PaymentButtons from "../../components/PaymentButtons";
import { useForm } from "react-hook-form";
import left from "../../assets/images/left-icon.png";
import image from "../../assets/images/cutter-sufa.png";
import { Link } from "react-router-dom";
const CheckoutInfo = () => {
  // paypal info
  const [business, setBusiness] = useState("");
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [returnUrl, setReturnUrl] = useState("");
  const [notifyUrl, setNotifyUrl] = useState("");
  const [invoice, setInvoice] = useState("");
  const [lc, setLc] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [cmd, setCmd] = useState("");
  //  --------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      email,
      privacy,
      address: customerAddress,
      apartment,
      city,
      country,
      firstName,
      lastName,
      phone,
      state,
      zip,
    } = data;
    const userinfo = `"${email}"`;
    const product = '[{"name": "test1"}, {"name": "test2"}]';
    const address = `{"city": "${city}", "info": "${apartment}"}`;
    const amount = "100";

    // Perform the fetch request
    fetch("https://www.theoutmaker.com/public/api/shopping/cart/paypal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userinfo, product, address, amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1) {
          const resdata = data.data;
          setBusiness(resdata?.business);
          setItemName(resdata?.item_name);
          setAmount(resdata?.amount); 
          setReturnUrl(resdata?.return);
          setNotifyUrl(resdata?.notify_url);
          setInvoice(resdata?.invoice);
          setLc(resdata?.lc);
          setCurrencyCode(resdata?.currency_code);
          setCmd(resdata?.cmd);
          console.log(data);
          console.log("after state set:", {
            business,
            itemName,
            amount,
            returnUrl,
            notifyUrl,
            lc,
            currencyCode,
            cmd,
          });

          // If you need to perform any actions that depend on the updated state here, you can do so

          // PayPal form submission
          // document.getElementById("form_startPay").submit();
        } else {
          alert(data.msg);
        }
      });
  };

  return (
    <section className="container mx-auto px-2 md:px-10 py-10 md:py-20 text-primary">
      <>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* deatails part */}
          <div className="shadow-xl px-5 py-8 flex-1">
            <div className="relative w-1/2 lg:w-1/4 mx-auto">
              <p className="absolute -top-6 lg:text-xl text-center text-primary p-2 lg:p-3 bg-white">
                Express Checkout
              </p>
            </div>
            <div className="border-2 border-primary rounded-lg p-[30px]">
              <PaymentButtons />
            </div>
            <div className="divider mt-12 font-bold text-primary">OR</div>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="text-primary">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-[20px]">
                  <input
                    className="input input-bordered border-2 border-primary focus:outline-none w-full"
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                  />

                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="checkbox checkbox-primary"
                      {...register("privacy", { required: true })}
                    />
                    <label htmlFor="privacy">Privacy Policy</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="checkbox checkbox-primary"
                      {...register("newsletter", {})}
                    />
                    <label htmlFor="newsletter">Subscribe to Newsletter</label>
                  </div>
                </div>
              </div>
              {/* for shipping address */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 mt-14">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="select select-bordered border-2 border-primary focus:outline-none w-full col-span-2"
                    {...register("country", { required: true })}
                  >
                    <option defaultValue="Australia">Australia</option>
                  </select>
                  <input
                    className="input input-bordered border-2 border-primary focus:outline-none w-full"
                    type="text"
                    placeholder="firstName"
                    {...register("firstName", { required: true })}
                  />
                  <input
                    className="input input-bordered border-2 border-primary focus:outline-none w-full"
                    type="text"
                    placeholder="lastName"
                    {...register("lastName", { required: true })}
                  />
                  <input
                    className="input input-bordered border-2 border-primary focus:outline-none w-full col-span-2"
                    type="text"
                    placeholder="address"
                    {...register("address", { required: true })}
                  />
                  <input
                    className="input input-bordered border-2 border-primary focus:outline-none w-full col-span-2"
                    type="text"
                    placeholder="apartment"
                    {...register("apartment", {})}
                  />
                  <div className="col-span-2 flex flex-col lg:flex-row gap-4 w-full">
                    <input
                      className="input input-bordered border-2 border-primary focus:outline-none w-full"
                      type="text"
                      placeholder="city"
                      {...register("city", { required: true })}
                    />
                    <select
                      className="select select-bordered border-2 border-primary focus:outline-none w-full"
                      {...register("state", { required: true })}
                    >
                      <option defaultValue="Chittagong">Chittagong</option>
                    </select>
                    <input
                      className="input input-bordered border-2 border-primary focus:outline-none w-full"
                      type="number"
                      placeholder="zip"
                      {...register("zip", { required: true })}
                    />
                  </div>
                  <input
                    className="input input-bordered border-2 border-primary focus:outline-none w-full col-span-2"
                    type="number"
                    placeholder="phone"
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-0 mt-14">
                <Link to="/checkout">
                  <button className="flex items-center gap-4">
                    <img src={left} alt="" className="w-[10px]" />
                    <span>Return to cart</span>
                  </button>
                </Link>
                <button className="btn btn-primary normal-case">
                  Continue to Shipping
                </button>
              </div>
            </form>

            {/* hidden form for paypal payment */}
            <form
              id="form_startPay"
              name="form_starPay"
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
            >
              {/* <code className="html comments"><!--测试www.sandbox.paypal.com，正式www.paypal.com--></code> */}
              <input type="hidden" name="cmd" value="_xclick" />
              <input
                type="hidden"
                id="business"
                name="business"
                value={business}
              />
              <input
                type="hidden"
                id="item_name"
                name="item_name"
                value={itemName}
              />
              <input type="hidden" id="amount" name="amount" value={amount} />
              <input type="hidden" name="currency_code" value={currencyCode} />
              <input
                type="hidden"
                id="return"
                name="return"
                value={returnUrl}
              />
              <input
                type="hidden"
                id="notify_url"
                name="notify_url"
                value={notifyUrl}
              />
              <input
                type="hidden"
                id="invoice"
                name="invoice"
                value={invoice}
              />
              <input type="hidden" id="custom" name="custom" value="" />
              <input type="hidden" name="lc" value={lc} />
              <input
                style={{ visibility: "hidden" }}
                type="image"
                src="https://www.paypal.com/en_US/i/btn/btn_buynow_LG.gif"
                border="0"
                name="submit"
                alt=" PayPal - The safer, easier way to pay online"
              />
            </form>
            {/* -------------------------------- */}
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
    </section>
  );
};

export default CheckoutInfo;