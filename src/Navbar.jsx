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
        document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
      <div>
        <div className="navbar bg-base-300 shadow-sm">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
              devFynder
            </Link>
          </div>

          {user && (
            <ul className="menu menu-horizontal bg-base-200 rounded-box mt-4 mr-4">
              <li>
              <Link to="/" className="tooltip" data-tip="Home">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                
                <Link to="/profile" className="tooltip" data-tip="Profile">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13M18.5 2.5L21.5 5.5L12 15L9 15L9 12L18.5 2.5Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                    </Link>
              </li>
              <li>
                <Link to="/connections" className="tooltip" data-tip="Connections">
                       <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 15C21 16.6569 19.6569 18 18 18H7.90909L3 22V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V15Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                    </Link>
              </li>
              <li>
                <Link to="/requests" className="tooltip" data-tip="Requests">
                      <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 14C14.2091 14 16 15.7909 16 18V21H8V18C8 15.7909 9.79086 14 12 14Z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19 10H22M20.5 8.5V11.5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                    </Link>
              </li>
              <li>
                <a className="tooltip" data-tip="Log Out" onClick={handleLogout}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H10M17 16L21 12L17 8M21 12H8"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          )}
          {user && (
            <div className="flex gap-2  mt-4">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn w-50 rounded-full"
                >
                  {" "}
                  {user ? "Welcome, " + user?.firstName : null}
                  {user && (
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user.photoUrl}
                      />
                    </div>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    {user.firstName}  {user.lastName}
                  </li>
                  <li className='my-5'>
                    {user.about === "default about" ? user.about + " ( Update on Profile page ) " : user.about} 
                  </li>
                  <li>
                    {user?.skills?.join(", ")} 
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default Navbar