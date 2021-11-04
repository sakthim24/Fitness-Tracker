import { React } from 'react'
import { Layout } from '../components/layout'


function Loading() {


  return (

    <Layout>
      <div className="h-5/6 bg-transparent text-gray-800 antialiased px-4 py-6 flex flex-col justify-center ">
        <div className="relative py-12 w-3/12  mx-auto text-center">
        <div className="absolute left-24 top-20 animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 "> </div>

          <div className="py-6 px-8">
          </div> </div></div>
    </Layout>
  );
}

export default Loading
