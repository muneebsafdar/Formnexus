import React from 'react'

export default function Hero() {
  return (
    <section className=" lg:grid lg:h-screen lg:place-content-center -mt-4">
        <div className="mx-auto w-screen max-w-screen-xl  px-4 py-10 sm:px-6 sm:py-24 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-prose text-center ">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Create Your Form in
              <strong className="text-purple-700"> Seconds </strong>
              not in Hours
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              FormNexus is your go to place to create your forms to collect data
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <a
                className="inline-block rounded border border-purple-600 bg-purple-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-purple-700"
                href="#"
              >
                Get Started
              </a>

              <a
                className="inline-block rounded border border-purple-200 px-5 py-3 font-medium text-purple-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
  )
}
