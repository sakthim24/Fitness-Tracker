import {React,useState} from 'react'
import Navlink from './navlink';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../context/userauthcontext';
import { Transition } from "@headlessui/react";

function Navabar() {
  const location = useLocation()
  const history = useHistory()
  const { currentuser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <div>
      <nav className="bg-white shadow md:h-20">
      <div className="min-w-screen mx-auto px-1">
          <div className="flex justify-between">
            <div className="md:flex md:space-x-5">
              <span className="flex items-center py-4 px-2  font-black tracking-tighter hover:text-green-800  text-xl  md:text-4xl text-green-500 "> FITNESS TRACKER</span></div>
            <div className="hidden md:flex items-center text-xl mr-4 space-x-2">

              <Navlink to='/' name='Home' />
              {!currentuser && <Navlink to='/login' name='Login' />}
              {!currentuser && <Navlink to='/register' name='Register' />}
              {currentuser && <Navlink to='/bmilayout' name='Check BMI' />}
              {currentuser && <Navlink to='/track' name='Track List' />}
              {currentuser && <Navlink to='/logout' name='Logout'
                onClick={async e => {
                  e.preventDefault()
                  await logout()
                
                  history.replace(location.state?.from ?? '/')
                }} />}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-tranparent inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-green-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
               
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          { (
            <div className="md:hidden" >
              <div  className="flex-col px-2 pt-2 pb-1  space-y-1 ">
              
                <Navlink to='/' name='Home' />
              {!currentuser && <Navlink to='/login' name='Login' />}
              {!currentuser && <Navlink to='/register' name='Register' />}
              {currentuser && <Navlink to='/bmilayout' name='Check BMI' />}
              {currentuser && <Navlink to='/track' name='Track List' />}
              {currentuser && <Navlink to='/logout' name='Logout'
                onClick={async e => {
                  e.preventDefault()
                  await logout()
                
                  history.replace(location.state?.from ?? '/')
                }} />}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
    </>
  )
}

export default Navabar
