import {React,useState} from 'react'
import { useAuth } from '../context/userauthcontext'
import { Layout } from '../components/layout';
import useMounted from '../hooks/usemounted';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Forgotpassword() {
    const [loginEmail, setLoginEmail] = useState("");
    const [isSubmit, setIsSubmit] = useState(false)
    const {forgotPassword } = useAuth()
    const [isNull, setisNull] = useState(false)
    const mounted= useMounted();
    const resetpassworduser = async (e) => {
      e.preventDefault()
      if (!loginEmail)  setisNull(true);
  
      else { setisNull(false);
     setIsSubmit(true)
     forgotPassword(loginEmail).then((response) =>{ 
       toast.info("Password Reset Link sent to your Email")
    })
     .catch((error)=>{
      toast.error("Oops! something went wrong")
}).finally(() => { mounted.current && setIsSubmit(false)})
    }
  }
    return (
      <Layout>
        <ToastContainer position="bottom-right"/>
        <div className=" h-5/6 w-11/12 md:ml-16 bg-transparent text-gray-800 antialiased px-4 py-2 md:py-6 flex flex-col justify-center ">
        <div className="relative py-10 w-11/12 md:w-4/12  mx-auto text-center">
          <div className="md:relative mt-4 bg-white shadow-lg w-100 sm:rounded-lg text-left">
            {isSubmit && <div className="absolute left-20 top-24 md:left-32 top-20 animate-spin rounded-full h-20 w-20 md:h-32 md:w-32 border-b-2 border-green-500 "> </div>}
            <div className="h-2 w-25  bg-green-500 rounded-t-md"></div>
            <div className="py-1 md:py-6 px-8">
              <h1 className="text-center mb-3 md:mb-4 block font-medium md:font-extrabold text-xl md:text-2xl text-grey-500">FORGOT PASSWORD</h1> 
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email "
                type="email"
                placeholder="Email"
                required
                onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }} />
                  {isNull &&  <span className="text-red-600 text-xs md:text-sm">*Email  field is empty</span>}
            </div>
            
            <div className="flex   mt-2 md:mb-0 mb-5 items-center justify-center">
              <button
                className="bg-green-500 h-10 md:h-10 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button" onClick={resetpassworduser} >
                Continue
              </button>
             </div>
            
        </div> </div></div></div>
        </Layout> 
      );
    }

export default Forgotpassword
