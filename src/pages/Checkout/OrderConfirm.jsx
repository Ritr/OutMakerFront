import React from "react";

const OrderConfirm = () => {
  return (
    <div className="container main_order_confirm mx-auto ml-24">
      <div className="flex 	justify-content">
        <ul className="flex py-4">
          <li>Wait for the buyer to pay</li>
          <li className="px-20">wait for the seller's Delivery </li>
          <li className="px-20">wait fo the buyer to confirm receipt</li>
          <li className="px-20">Deals are done</li>
        </ul>
      </div>
      <div className="pb-10">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-900 dark:text-white text-right">
            45%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-900 h-2.5 rounded-full"
            style={{ width: "45%" }}
          ></div>
        </div>
      </div>
      <div></div>
      <section className="container bg-sky-100 p-10 rounded-lg">
        <div className="leading-10">
          <p>
            Current Order Status:{" "}
            <span className="text-blue-900">
              The buyer has paid and is waiting for the seller to ship
            </span>
          </p>
          1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          fugit!
          <br />
          2. Add Note
        </div>
      </section>

      <section className="bg-gray py-10">
        <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full">
          Order Information
        </button>
        <div className="order_info flex justify-between py-5 px-20">
          <div className="good_Receving_information leading-8">
            <h3 className="text-blue-900 font-bold">
              Goods receiving Information
            </h3>
            <p>order Number: 12215515515115</p>
            <p>order Create Time: 2023-11-04- 21:32:53</p>
            <p>Consignee: Miss Wong</p>
            <p>Delivery Address: Erqi District: Chittagong </p>
            <p>Contact: 01866390726 </p>
          </div>
          <div className="seller_infoo leading-8">
            <h3 className="text-blue-900 font-bold">Seller Information</h3>
            <p>Suppiler: Name</p>
            <p>Address: Beijing Shinjstan District</p>
            <p>1355688888</p>
          </div>
        </div>
      </section>
      <section>
        <div className="w-full">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr>
                <th className="px-6 py-3 text-blue-900 bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                  Commodity
                </th>
                <th className="px-6 py-3 text-blue-900 bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-blue-900 bg-gray-100 text-left text-xs leading-4 font-medium  first-line:uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-blue-900 bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                  Discounts
                </th>
                <th className="px-6 py-3 text-blue-900 bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-blue-900 bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                  Distributi0on Mode
                </th>
                <th className="px-6 py-3 text-blue-900 bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                  Goods Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              <tr className="">
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm text-gray-900 leading-8">
                    <p>Product Name: Product name</p>
                    <p>Commodity Name</p>
                    <p>
                      {" "}
                      <span>Commodity Name</span>
                    </p>
                    <div>
                      <button>43 Hours Delivery</button>
                      <button>First Delivery</button>
                      <button>Express Delivery</button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">6</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">$299</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">$30</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    WeChat Pay
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    Expressage
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    Not Yet Shipped
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <p className="text-right">
            <span>Freight Insurance </span> Claims can be settled if the good
            are return before receipt <span>Apply for Claim</span>
          </p>
          <p className="text-right">
            <span>Delivery Commitment </span> Order promise delivery within a
            limited time, delay can be compenteed <span>Apply for Claim</span>
          </p>
        </div>
        <div className="flex justify-between font-bold leading-8">
          <div className="text-blue-900">
            <p>Total Cost</p>
            <p>Freight</p>
            <p className="text-blue-900">Customer Service Tel: 0371-88886666</p>
          </div>
          <div className="text-right text-blue-900">
            <p>$269</p>
            <p>$0</p>
            <p>Actual Payment: $269</p>
          </div>
        </div>
        <div className="text-right py-5">
          <button className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-md px-4 py-2 mr-4">
            Cancellation of Order
          </button>
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full">
            Confirm an Order
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirm;
