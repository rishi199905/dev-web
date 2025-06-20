import axios from 'axios'
import React, { useState } from 'react'
import { removeFeed } from './utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from './utils/constants'

const UserCard = (user) => {

    if (user.user === undefined) return (
       <div className="flex justify-center my-10">
            No Users in Feed!
          </div>
      );

    const { firstName, lastName, about, photoUrl, gender, age, skills } = user.user
    const loggenInUser = useSelector((store) => store.user)
    const [ alert, setAlert ] = useState("")
    const dispatch = useDispatch()
    const requests = useSelector((store) => store.requests)
  
    const sendConnection = async (status, _id) => {
      try {
          const sendRes = await axios.post(BASE_URL+ "/request/send/" + status + "/" + _id, {},  { withCredentials: true})
          showAlert(status);
          dispatch(removeFeed(_id))
      } catch (error) {
          console.log(error)
      }
  }

  const showAlert = async (status) => {
    setAlert(status);
    await delay();
  }

  const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
          setAlert(false)
          resolve(true)
        }, 750)
    })
  }


  const containsAny = (arr1, arr2) => {
  return arr1.some(item => {
    return arr2.includes(item);
  });
}
  
    return (
      <div>
        <div className="card card-side bg-rose-100 shadow-sm border-2">
          <figure>
            <img src={photoUrl} style={{
          width: '300px',   
          height: '255px',   
          borderRadius: '8px' 
        }} alt="Profile Pic!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstName} {lastName}
              {containsAny(skills, loggenInUser?.skills) ? (
                <div className="badge badge-secondary"> Similar Skills</div>
              ) : (
                ""
              )}
            </h2>

            <p>{gender}</p>
            <p>{age}</p>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Developer Details
              </div>
              <div className="collapse-content text-xs">
                <p>{about} </p> <p> Skills: {skills.join(", ")} </p>
              </div>
            </div>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary bg-red-600"
                onClick={() => {
                  sendConnection("ignored", user.user._id);
                }}
              >
                Skip
              </button>
              <button
                className="btn btn-primary bg-green-600"
                onClick={() => {
                  sendConnection("interested", user.user._id);
                }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
        {alert === "interested" ? ( 
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Sent Connection Request.</span>
          </div>
        ) : alert === "ignored" ? <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Developer skipped.</span>
</div> : null}
      </div>
    );
}

export default UserCard