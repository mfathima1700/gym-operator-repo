import React from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";



function OrderSummary({handleCheckout, message, owner}: {handleCheckout: any, message: string, owner: boolean}) {
  return (
    <>
      <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-white">Checkout</h2>

        <div className="mt-4 rounded-lg border border-gray-800  shadow-xs">
          <h3 className="sr-only">Items in your cart</h3>
          <ul role="list" className="divide-y divide-gray-800">
          
              <div  className="flex px-4 py-6 sm:px-6">
                <div className="shrink-0 bg-white">
                  {/* <img
                    alt={"Front of men's Basic Tee in black."}
                    src={"/centred-logo.png"}
                    className="w-20 rounded-md"
                  /> */}
                </div>

                <div className="ml-6 flex flex-1 flex-col">
                  <div className="flex">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm">
                        <a
                          className="font-medium text-gray-200"
                        >
                          {owner ? "Gym Ownership Subscription" :  "Gym Membership Subscription" }
                        </a>
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                       {owner ? "Member management" : "Booking classes" }
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                      {owner ? "Payment processing" : "Payment management" }
                      </p>
                    </div>

                    
                  </div>

                  <div className="flex flex-1 items-end justify-between pt-2">
                    <p className="mt-1 text-sm font-medium text-gray-200">
                    { owner ? `£50.00` : `£25.00`} 
                    
                    
                    </p>

                    <div className="ml-4">
                      <div className="grid grid-cols-1">
                        <select
                          id="quantity"
                          disabled={true}
                          name="quantity"
                          aria-label="Quantity"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option value={1}>1</option>
                         
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-900 sm:size-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
          </ul>
          <dl className="space-y-6 border-t border-gray-800 px-4 py-6 sm:px-6">
          
            <div className="flex items-center justify-between">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-200">{ owner ? `£50.00` : `£25.00`}{" "}
                <span className="font-normal text-gray-600">
                    /month
                    </span></dd>
            </div>
          </dl>

          <div className="border-t border-gray-800 px-4 py-6 sm:px-6">
            <button
             onClick={handleCheckout}

              className="w-full rounded-md border border-transparent bg-lime-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
            >
              Pay Now
            </button>
            {
                message  && (
                    <p className="text-base font-medium text-red-600">{message}</p>
                    )
            }

<p className="text-sm text-gray-600 mt-4">
    By subscribing, you agree to our <a href="/terms" className="hover:underline">Terms of Service
    </a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.
  </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
