import React from 'react'
import { NavLink as Link, useLocation } from 'react-router-dom'


export default function Navlink({ to, name, ...rest }) {
  const location = useLocation()

  const isActive = location.pathname === to

  return (
      
    <Link to={to}>
      <button className={isActive ? 'md:h-8 md:w-18 border-t-2 border-green-500 md:border-2 border-green-500  text-green-500 font-medium px-2 md:rounded-lg ' : ' h-8 w-18 border-2 border-transparent   text-green-500 text-center font-bold  px-2 rounded-lg '}               
    type="button" {...rest}> {name}</button>
    </Link>
  )
}


// className="h-10 w-18 border-2 border-green-500  hover:bg-green-500 hover:text-white