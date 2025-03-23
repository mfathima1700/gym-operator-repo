import React from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

function SuccessMessage() {
  return (
    <div>
        <div
            
            className=" rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl   sm:my-8 sm:w-full sm:max-w-sm sm:p-6 "
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-base font-semibold text-gray-900">
                  Payment successful
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back to dashboard
              </button>
            </div>
          </div>
    </div>
  )
}

export default SuccessMessage