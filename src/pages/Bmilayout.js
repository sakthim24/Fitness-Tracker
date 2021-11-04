import { React, useState, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom'; 
import { useBmi } from '../context/bmifunction';
import { Layout } from '../components/layout';
import GaugeChart from 'react-gauge-chart'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calc() {
  const [units, setunits] = useState("Metrics");
  const [isNull, setisNull] = useState(false)
  const [isLocationChanged, setisLocationChanged] = useState(true)
  const{addToRecord,bmiResult,status,calculateBMI}=useBmi()
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const chartStyle = {
    height: 100,
    width:250
  }

  const location = useLocation();

  useEffect(() => {
    setisLocationChanged(false)
    console.log('Location changed',isLocationChanged);
  }, [location]);


 const calculate = () => {
  if (!height || !weight) 
    setisNull(true)
  else {
    setisNull(false);
    calculateBMI(height,weight,units)
    setisLocationChanged(true)
}
 }
  return (
    <Layout>
     
      <div className=" h-5/6 w-11/12 md:ml-16 bg-transparent text-gray-800 antialiased px-4 py-2 md:py-6 flex flex-col justify-center ">
        <div className="relative py-10 w-11/12 md:w-4/12  mx-auto text-center">

          <div className="md:relative mt-4 bg-white shadow-lg w-100 sm:rounded-lg text-left">
            <div className="h-2 w-25  bg-green-500 rounded-t-md"></div>
            <div className="py-1 md:py-6 px-8">
              <h1 className="text-center mb-3 md:mb-4 block font-extrabold text-2xl text-grey-500"> BMI Calculator</h1>
              <select className="mb-1 md:mb-2  text-sm font-bold bg-green-500 border-2 border-black rounded" onChange={async e => {
                e.preventDefault()
                await setunits(e.target.value)
                 }}>
                <option  value="Metrics">Metrics</option>
                <option value="US">US</option>
              </select>
            
              <div className="mb-2 md:mb-4">
                <label
                  className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Height 
                </label>
                <input
                  className="shadow appearance-none h-7 md:h-10 md:rounded w-full py-2 px-3 text-xs text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                  id="Height "
                  type="number"
                  placeholder={units == 'Metrics' ? "Height in cm" : "Height in inch"}
                  onChange={async e => {
                    e.preventDefault()
                    await setHeight(e.target.value)
                  }} />
              </div>

              <div className="mb-1 md:mb-4">
                <label
                  className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Weight
                </label>
                <input
                  className="shadow appearance-none h-7 md:h-10 md:rounded w-full py-2 px-3 text-xs text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  id="Weight"
                  type="number"
                  placeholder={units == 'Metrics' ? "Weight in kg" : "Weight in lbs"}
                  onChange={async e => {
                    e.preventDefault()
                    await setWeight(e.target.value)
                  }} />
              </div>
              {isNull && <span className="text-red-600 text-xs md:text-sm">*All fields are required</span>}
              <div className="flex mt-2 items-center justify-center">
                <button
                  className="bg-green-500 hover:bg-green-800 text-white h-8 md:h-10 text-xs md:text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button" onClick={calculate}>
                  Calculate BMI
                </button>
              </div> 
              <div className="mt-1 flex items-center  justify-center">
              <GaugeChart style={chartStyle} className=" font-bold h-4" formatTextValue={value => value } 
              nrOfLevels={8} arcWidth={0.45}  needleColor="#10B981" hideText="false" id="gauge-chart1" 
              colors={['#F80F0F', '#F7E40F', '#F7E40F','#5BE12C','#F5CD19', '#EA4228', '#F80F0F','#730404']}
              arcsLength={[0.32, 0.02, 0.03, 0.13, 0.1, 0.1, 0.1, 0.2]} percent={bmiResult/50} arcPadding={0} cornerRadius={0}/>
              </div>
             
           {isLocationChanged ?<> <div className="flex items-center text-sm md:text-base justify-center text-gray-700 font-bold">
             {`${status} ${bmiResult}`} 
              </div>   <div className="flex mt-2 items-center justify-center">
                <button
                  className="bg-green-500 hover:bg-green-800 text-white h-8 md:h-10 text-xs md:text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button" onClick={() => {
                    addToRecord(bmiResult,status)       
                    toast.success("Record added successfully")         
                  }}>
                 Record
                </button>
              </div></>:<span></span>
              }
            </div>
           
            </div></div>
      </div>
<ToastContainer  position="bottom-right"/>
    </Layout>

  );
}

export default Calc;
