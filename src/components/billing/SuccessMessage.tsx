import React from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

function SuccessMessage({id, owner}: {id: string, owner: boolean}) {
  return (
    <div>
        <div
            
            className=" rounded-lg  border border-gray-800 px-4 pt-5 pb-4 text-left shadow-xl   sm:my-8 sm:w-full sm:max-w-sm sm:p-6 "
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-950">
                <CheckIcon aria-hidden="true" className="size-6 text-green-200" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-base font-semibold text-white">
                  Payment successful
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                  {`Thank you for your purchase! Your payment for the Gym ${owner ? "Owner" : "Member"} Subscription has been successfully processed.
                   It is now active. A confirmation email has been sent to your inbox.`}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => window.location.href = `/${owner ? "owner" : "individual"}/${id}/`}
                className="inline-flex w-full justify-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
              >
                Go back to dashboard
              </button>
            </div>
          </div>
    </div>
  )
}

export default SuccessMessage