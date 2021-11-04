import { React, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../context/userauthcontext'
import { Layout } from '../components/layout';
import useMounted from '../hooks/usemounted';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)
  const { login } = useAuth()
  const [isNull, setisNull] = useState(false)
  const mounted = useMounted();
  const location = useLocation()
  const history = useHistory()
  const loginuser = async (e) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) setisNull(true);

    else {
      setisNull(false);
      setIsSubmit(true)
      await login(loginEmail, loginPassword).then((response) => {
        toast.success("Logged in successfully")
        history.replace(location.state?.from ?? '/')
      })
        .catch((error) => {
          toast.error("Email or password wrong")
        }).finally(() => { mounted.current && setIsSubmit(false) })
    }
  }


  return (
    <Layout>
      <ToastContainer position="bottom-right" />
      <div className=" h-5/6 w-11/12 md:ml-16 bg-transparent text-gray-800 antialiased px-4 py-2 md:py-6 flex flex-col justify-center ">
        <div className="relative py-10 w-10/12 md:w-4/12  mx-auto text-center">
          <div className="md:relative mt-4 bg-white shadow-lg w-100 sm:rounded-lg text-left">
            {isSubmit && <div className="absolute left-20 top-24 md:left-32 md:top-20 animate-spin rounded-full h-20 w-20 md:h-32 md:w-32 border-b-2 border-green-500 "> </div>}
            <div className="h-2 w-25  bg-green-500 rounded-t-md"></div>
            <div className="py-1 md:py-6 px-8">
              <h1 className="text-center mb-3 md:mb-4 block font-medium md:font-extrabold text-2xl text-grey-500">LOG IN</h1>
              <div className="mb-2 md:mb-4">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="shadow appearance-none h-7 md:h-10 md:rounded w-full py-2 px-3 text-xs text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  id="email "
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }} />
              </div>
              <div className="mb-1 md:mb-4">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="shadow appearance-none h-7 md:h-10 md:rounded w-full py-1 px-3 text-xs text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="password "
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }} />
                {isNull && <span className="text-red-600 text-xs md:text-sm">*All fields are required</span>}
              </div>
              <div className="flex mt-3 md:mt-0 items-center justify-center">
                <button
                  className="bg-green-500 hover:bg-green-800 text-white h-8  md:h-10 text-xs md:text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button" onClick={loginuser} >
                  Login
                </button>
              </div>
              <div className="flex justify-between items-baseline py-2 md:pr-5">
                <span className="text-xs md:text-sm hover:text-blue-500 md:pr-0"> <Link to='/forgotpassword'>Forgot password?</Link></span>
                <span className="text-xs md:text-sm hover:text-blue-500 md:pl-5" onClick={() => history.push('/register')}>Signup</span>
              </div>
            </div> </div></div></div>
    </Layout>
  );
}

export default Login
