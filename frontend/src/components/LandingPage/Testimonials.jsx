import React from 'react'

function Testimonials() {
  return (
    <section className='py-16'>
        <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-semibold text-gray-800'>Testimonails</h2>
            <div className='flex flex-wrap justify-center mt-8'>
                <div className='w-full md:w-1/2 lg:w-1/3 px-4 mb-8'> 
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='text-gray-600'>Amazing Service! I'm very satisfied with their work</p>
                        <p className='text-gray-800 font-semibold mt-4'>KMUTT MATCHER</p>
                    </div>
                </div>
                <div className='w-full md:w-1/2 lg:w-1/3 px-4 mb-8'> 
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='text-gray-600'>Great Experiece</p>
                        <p className='text-gray-800 font-semibold mt-4'>KMUTT MATCHER</p>
                    </div>
                </div>
                <div className='w-full md:w-1/2 lg:w-1/3 px-4 mb-8'> 
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='text-gray-600'>Great work</p>
                        <p className='text-gray-800 font-semibold mt-4'>KMUTT MATCHER</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonials