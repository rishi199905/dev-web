import React from 'react'
import { useSelector } from 'react-redux'
import cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector((store) => store.user)

    const handleLogout = () => {
        cookies.remove('token')
    }
  
    return (
    <div><div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">devTinder</Link>
    </div>
    <div className="flex gap-2">
     
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
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
            <a>Settings</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div></div>
  )
}

export default Navbar