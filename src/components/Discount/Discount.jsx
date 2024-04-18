import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { sendDiscountEmail } from "../../Hooks/api/sendDiscountEmail";
const Discount = ({ onCancel, visible }) => {
    const [email, setEmail] = useState("");
    const sendDiscountEmailMutation = sendDiscountEmail(email);
    const submit = () => {
        sendDiscountEmailMutation.mutate();
    };
    useEffect(() => {
        if (sendDiscountEmailMutation.isSuccess) {
            toast.success("Email sent successfully");
            onCancel();
        }
    }, [sendDiscountEmailMutation.isSuccess]);
    useEffect(() => {
        if (sendDiscountEmailMutation.isError) {
            toast.error("Failed to send email");
        }
    }, [sendDiscountEmailMutation.isError]);
    return (
        <div className={`discount ${visible ? "visible" : "hidden"}`}>
            <div className="modal modal-open">
                <div className="modal-box max-w-xl px-2 pb-16 rounded-md">
                    <div className="flex justify-end font-semibold text-3xl mb-4">
                        <IoMdClose
                            className="cursor-pointer text-[#C2C2C2] mr-4"
                            onClick={onCancel}
                        ></IoMdClose>
                    </div>
                    <div className="px-10 md:px-24">
                        <div className="text-primary text-lg md:text-2xl font-semibold">
                            10% OFF YOUR FIRST ORDER
                        </div>
                        <div className="mt-2  md:mt-4 md:text-xl text-primary">
                            When you sign up for updates
                        </div>
                        <div className="mt-6 md:mt-8">
                            <input
                                type="text"
                                className=" w-64 h-10 md:w-[360px] md:h-[40px] border indent-4 rounded-sm"
                                placeholder="Email"
                                onInput={e => setEmail(e.target.value)}
                                onBlur={()=>{window.scrollTo(0,0,)}}
                            />
                        </div>
                        <div className="mt-2 md:mt-4">
                            <button disabled={sendDiscountEmailMutation.isLoading} className="w-64  h-10 btn btn-primary md:h-auto md:w-[360px] py-3  rounded-sm text-md md:text-base font-medium" onClick={submit}>
                                Get 10% off
                            </button>
                        </div>
                        <div className="mt-6 md:mt-8 w-64 md:w-[360px] text-center">
                            <span className="cursor-pointer text-md md:text-base" onClick={onCancel}>
                                No, thanks
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Discount;
