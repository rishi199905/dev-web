import axios from 'axios'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import Navbar from './navbar'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((store) => store.user)

    const fetchProfile = async  () => {
        try {
            const profileRespone = await axios.get(BASE_URL + "/profile/view", {withCredentials: true})
            dispatch(addUser(profileRespone.data))
        } catch (error) {
            console.log(error)
            if (error.status === 401) {
                navigate("/login")
            }
        }
    }

    useEffect( () => {
        if (user) {
            fetchProfile()
        }
    }, [])
    
  return (
    <div>
        <Navbar/>
        <Outlet />
    </div>
  )
}

export default Body