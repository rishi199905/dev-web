import React from 'react'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div><Navbar></Navbar>
        <Outlet />
    </div>
  )
}

export default Body