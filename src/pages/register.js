import { React, useState } from 'react';
import { Layout } from '../components/layout';
import { useAuth } from '../context/userauthcontext'
import useMounted from '../hooks/usemounted';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)
  const { register } = useAuth()
  const [isNull, setisNull] = useState(false)
  const mounted = useMounted();

  const registeruser = async (e) => {
    e.preventDefault()
    if (!registerEmail || !registerPassword) setisNull(true);

    else {
      setisNull(false);
      setIsSubmit(true)
      await register(registerEmail, registerPassword).then((response) =>
        toast.success("User created successfully"))
        .catch((error) => {
          toast.error(error.message)
        }).finally(() => { mounted.current && setIsSubmit(false) })
    }
  }

  return (
    <Layout>
      <ToastContainer position="bottom-right" />
      <div className=" h-5/6 w-11/12 md:ml-16 bg-transparent text-gray-800 antialiased px-4 py-2 md:py-6 flex flex-col justify-center ">
        <div className="relative py-10 w-10/12 md:w-4/12  mx-auto text-center">
          <div className="md:relative mt-4 bg-white shadow-lg w-100 sm:rounded-lg text-left">
            {isSubmit && <div className="absolute left-20 top-24 md:left-32 top-20 animate-spin rounded-full h-20 w-20 md:h-32 md:w-32 border-b-2 border-green-500 "> </div>}
            <div className="h-2 w-25  bg-green-500 rounded-t-md"></div>
            <form className="py-1 md:py-6 px-8">
              <h1 className="text-center mb-3 md:mb-4 block font-extrabold text-2xl text-grey-500">REGISTER</h1>
              <div className="mb-2 md:mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="shadow appearance-none h-7 md:h-10 md:rounded w-full py-1 px-3 text-xs text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  id="email "
                  type="email"
                  placeholder="Enter valid email"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }} />
              </div>
              <div className="mb-2 md:mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="shadow appearance-none h-7 md:h-10 md:rounded w-full py-1 px-3 text-xs text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="password (min 6 characters)"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }} />
                {isNull && <span className="text-red-600 text-sm">*All fields are required</span>}
              </div>
              <div className="flex mt-3 mb-5 md:mt-0 items-center justify-center">
                <button
                  className="bg-green-500 hover:bg-green-800 text-white h-8 md:h-10 text-xs md:text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button" onClick={registeruser}> Sign up
                </button>
              </div>
            </form>
          </div></div>
      </div>
    </Layout>
  );
}

export default Register
