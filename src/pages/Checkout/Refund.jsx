import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
const Refund = ({ id, visible, onSubmit, onCancel, max }) => {
    if (!visible) {
        return null;
    }
    const [type, setType] = useState(-1);
    const [amount, setAmount] = useState();
    const submit = async () => {
        if (type < 0) {
            toast.error("Please select a refund type!", "error");

            return;
        }
        if (!amount) {
            toast.error("Please input amount!", "error");

            return;
        }
        const data = {
            order_id: id,
            refund_type: type * 1,
            amount: amount
        }
        const response = await fetch(
            "https://api.theoutmaker.com.au/api/pay/orders/refund",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const res = await response.json();
        if (res && res.msg === "Ok") {
            // 提示成功
            toast.success("Refund application successful!", "success");
            onCancel();
        } else {
            // 提示失败
            toast.error("Refund application failed!", "error");
        }
        console.log(response);
    };
    useEffect(() => {
        if (amount > max) {
            setAmount(max);
        }
    }, [amount]);
    return (
        <div className="modal modal-open fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="modal-box relative bg-white rounded max-w-lg mx-auto my-10 p-5">
                <h3 className="font-bold text-lg">Full/Partial refund:</h3>
                <select
                    class="select select-bordered w-full "
                    onChange={(e) => setType(e.target.value)}
                >
                    <option disabled selected>
                        Please select Full/Partial refund
                    </option>
                    <option value={0}>Full refund</option>
                    <option value={1}>Partial refund</option>
                </select>
                <h3 className="font-bold text-lg">Amount:</h3>
                <input
                    type="number"
                    placeholder="Please Fill in amount:"
                    className="input input-bordered w-full mb-4"
                    onInput={(e) => {
                        setAmount(e.target.value);
                    }}
                    value={amount}
                />

                <div className="flex flex-col items-center space-y-4">
                    <button
                        className="btn btn-primary w-full max-w-xs normal-case"
                        onClick={submit}
                    >
                        Submit to
                    </button>
                    <button
                        className="btn btn-ghost w-full max-w-xs normal-case"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Refund;
