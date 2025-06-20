import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from './utils/requestsSlice'

const Requests = () => {

    const dispatch = useDispatch()
    const requests = useSelector((store) => store.requests);
    const [ showSuccess, setshowSuccess ]  = useState("")
    

    const fetchRequests = async () => {
        try {
            const reqRespone = await axios.get(BASE_URL + "/user/requests", { withCredentials: true})
            console.log(reqRespone)
            dispatch(addRequest(reqRespone?.data?.data))
        } catch (error) {
            console.log(error)
        }
    }

    const reviewConnection = async (status, _id) => {
        try {
            const reviewRes = await axios.post(BASE_URL+ "/request/review/" + status + "/" + _id, {},  { withCredentials: true})
            dispatch(removeRequest(_id))
            showAlert(status)
        } catch (error) {
            console.log(error)
        }
    }

    const showAlert = async (status) => {
    setshowSuccess(status);
    await delay();
  }

  const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
          setshowSuccess(false)
          resolve(true)
        }, 750)
    })
  }

    useEffect( () => {
        fetchRequests()
    }, [])

    if (requests?.length === 0) return (
       <div className="flex justify-center my-10">
            No new requests!
          </div>
      );

    return (
   
        <div className="text-center my-10">
          <h1 className="text-bold text-white text-3xl">Requests</h1>
    
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request?.fromId;
    
            return (
              
              <ul
                key={_id}
               className="list bg-base-800 rounded-box shadow-lg my-3"
              >
                <li className="list-row grid grid-cols-4">
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full object-cover"
                    src={photoUrl}
                  />
                </div>
                <div className="text-left mt-3 ">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  
                </div>
                <div className="text-left mt-3 ">{about}</div>
                <div className='flex text-right'>
                    <button className="btn btn-primary "  onClick={() => {reviewConnection("accepted", request._id)}}>Accept </button>
                    <button className="btn btn-secondary ml-10"  onClick={() => {reviewConnection("rejected", request._id)}}>Reject</button>
                </div>
              </li>
                      
              </ul>
            );
          })}
          {showSuccess === "accepted" ? <div className="toast toast-bottom toast-right mb-10">
            
                        <div className="alert alert-success">
                          <span>Connection Accepted.</span>
                        </div>
                      </div> : showSuccess === "rejected" ? <div className="toast toast-bottom toast-right mb-10">
            
                        <div className="alert alert-info">
                          <span>Connection Rejected.</span>
                        </div>
                      </div> : null }
        </div>
      )
}

export default Requests