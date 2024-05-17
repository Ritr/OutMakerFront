import React, { useEffect } from "react";
import paypal from "../../assets/icons/paypal1.svg";
import zip from "../../assets/icons/zip.png";
import afterpay from "../../assets/Afterpay.png";
import visa from "../../assets/icons/visa.webp";
import jcb from "../../assets/icons/jcb.png";
import ae from "../../assets/icons/ae.png";
import mastercard2 from "../../assets/icons/mastercard2.png";
const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <section className="w-full max-w-screen-lg mx-auto p-8 text-left text-gray-700">
            <h1 className="mt-[20pt] mb-[6pt] text-center font-[20pt] leading-[115%]">
                <span className="text-2xl">Payment Methods</span>
            </h1>
            <p className="font-[14pt] leading-[115%]">
                <span className="text-xl block pb-4 pt-6">1. Pay With Credit/Debit Card</span>
            </p>
            <div className="inline-flex gap-2 mb-2">
                <img src={visa} alt="" className="h-20 object-contain" />
                <img src={jcb} alt="" className="h-20 object-contain" />
                <img src={ae} alt="" className="h-20 object-contain" />
                <img src={mastercard2} alt="" className="h-20 object-contain" />
            </div>
            <p className="leading-[115%]">
                <span className="text-sm">
                    When you pay with a credit or debit card, you need the name printed on the card, the card number, the month and year the card expires, and the 3-digit or 4-digit security code.
                    <br />
                    This information, along with the billing address for the credit card, must be entered during the purchase process.
                    <br />
                    We accept the credit/debit cards listed above.
                    <br />
                    Please note that SHEIN does not save your credit/debit card number or personal information entered into the payment fields when you make a payment. For questions regarding your transactions on your credit/debit card, please consult the bank that issued your credit/debit card.
                </span>
            </p>

            <p className="font-[14pt] leading-[115%]">
                <span className="text-xl block pb-4 pt-6">2. Pay With Paypal</span>
            </p>
            <img src={paypal} alt="" className="w-36" />
            <p className="leading-[115%]">
                <span className="text-sm">
                    When you choose to pay for an order via PayPal you will be redirected to the PayPal payment page, where you can log in with your PayPal username and password. If you do not have a PayPal account, or if you do not want to use your PayPal account, you may still pay via PayPal, by clicking on the "Pay with Debit or Credit Card" option on the PayPal payment page, and you will be redirected to a secure page where you can first enter your email address and then enter your credit card information to complete your payment safely via PayPal.
                </span>
            </p>

            <p className="font-[14pt] leading-[115%]">
                <span className="text-xl block pb-4 pt-6">3. Pay With Afterpay</span>
            </p>
            <img src={afterpay} alt="" className="w-36" />
            <p className="leading-[115%]">
                <span className="text-sm">
                    You can choose to pay for your order with Afterpay. Just log into your Afterpay account and you can pay for your order in 4 equalinstallments, with the first payment being made at the time you place your order. If you make the rest of the payment installments on time, there is no interest and no fees.
                    For more information, just click here .
                    <br />
                    For more information, just click <a href="https://us.shein.com/Zip-a-1101.html" className="text-red-400">here.</a>
                </span>
            </p>

            <p className="font-[14pt] leading-[115%]">
                <span className="text-xl block pb-4 pt-6">4. Pay With ZiP</span>
            </p>
            <img src={zip} alt="" className="w-36" />
            <p className="leading-[115%]">
                <span className="text-sm">
                    Buy Now. Pay Later.
                    <br />
                    Split nearly any purchase into 4 installments over 6 weeks payments with Zip.
                    <br />
                    Choose Zip as your payment method at checkout. Make your payment more convenient.
                    <br />
                    he first 25% of your order total is charged at the time of purchase. Pay the rest in 3 equal installments that are billed automatically over 6 weeks.
                    <br />
                    For more, just click <a href="https://us.shein.com/Afterpay-a-1015.html" className="text-red-400">here.</a>
                </span>
            </p>
        </section>
    );
};
export default AboutUs;
