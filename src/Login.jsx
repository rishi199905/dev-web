import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from "./utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';
const Login = () => {

    const [ email, setEmailId ]  = useState('')
    const [ password, setpassword ]  = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            console.log({
                email, password
            })
            const loginResponse = await axios.post(BASE_URL + "/login", {
                email, password
            }, {withCredentials: true})
            dispatch(addUser(loginResponse.data))
            return navigate("/")
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className="flex justify-center ">
      <div className="card card-border bg-slate-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className='my-5'>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Email</legend>
              <input type="text" value={email} className="input" onChange={(e) => {setEmailId(e.target.value)}} placeholder="Type Email here" />
            </fieldset>
            </div>
            <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" value={password} className="input" onChange={(e) => {setpassword(e.target.value)}} placeholder="Type Password here" />
            </fieldset>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login