import React from 'react'
import { Layout } from './components/layout'


function Home() {
  return (
    <Layout>
    <section className="m-8 md:m-16 md:mt-32">
        <div className="md:grid grid-template-areas items-center">
          <h1 className="md:w-3/5 pr-2 text-4xl font-extrabold light:text-dark md:text-6xl">
            <span className="block mb-2 md:mb-6 text-xl md:text-2xl text-green-500 md:text-4xl">
              Hello Gym Rat
              <span className='m-4  text-grey-500'>
                👋
              </span>{' '}
            </span>
            I'm your <span className="text-green-500 hover:text-green-800">Fitness Tracker</span> {' '}
            <span className="block mb-1 md:mt-6 text-xl text-grey-500 md:text-4xl">Get on Track from Today...</span>
          </h1>
        </div>
      </section>
    </Layout>
  )
}

export default Home
