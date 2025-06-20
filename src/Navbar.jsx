import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from './utils/constants'
import { removeUser } from './utils/userSlice'
import axios from 'axios'

const Navbar = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
        const response = await axios.post(BASE_URL+ "/logout", {withCredentials: true}) 
        dispatch(removeUser())
        return navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
  
    return ( 
    <div><div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">devFynder</Link>
    </div>

    <ul className="menu menu-horizontal bg-base-200 rounded-box mt-4 mr-4">
  <li>
    <a className="tooltip" data-tip="Home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </a>
  </li>
  <li>
    <a className="tooltip" data-tip="Details">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </a>
  </li>
  <li>
    <a className="tooltip" data-tip="Stats">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </a>
  </li>
</ul>
     {user && <div className="flex gap-2  mt-4">
     
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn w-50 rounded-full"
        > { user ? "Welcome, " + user?.firstName : null}
          {user && <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoUrl}
            />
          </div>}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
           <Link to="/profile" className="justify-between">
              Profile
            </Link> 
          </li>
          <li>
          <Link to="/connections" className="justify-between">
              Connections
            </Link> 
          </li>
          <li>
          <Link to="/requests" className="justify-between">
              Requests
            </Link> 
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>}
  </div></div>
  )
}

export default Navbar