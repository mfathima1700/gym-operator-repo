import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function FailureMessage({id, owner}: {id: string, owner: boolean}) {
  return (
    <div> <div
                
                className=" rounded-lg border border-gray-800 px-4 pt-5 pb-4 text-left shadow-xl   sm:my-8 sm:w-full sm:max-w-sm sm:p-6 "
              >
                <div>
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-900">
                    <XMarkIcon aria-hidden="true" className="size-6 text-red-200" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-base font-semibold text-white">
                      Payment failed
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                      {`Unfortunately, your payment for the Gym ${owner ? "Owner" : "Member"} Subscription was not successful.
                       Please check your payment details and try again. 
                       If the issue persists, contact your bank or try a different payment method.
                        No charges were made to your account.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    
                    className="inline-flex w-full justify-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                  >
                    Go back to dashboard
                  </button>
                </div>
              </div></div>
  )
}

export default FailureMessage