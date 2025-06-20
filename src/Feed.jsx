import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './utils/feedSlice'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import UserCard from './UserCard'

const Feed = () => {

    const dispatch = useDispatch()
    const feed = useSelector((  store) => store.feed)
    console.log(feed === null)
    const fetchFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/feed", {withCredentials: true})
            dispatch(addFeed(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect( () => {
        fetchFeed()
    }, [])

  return (
   <div className="flex justify-center my-10">
        { (feed && feed !== undefined && feed !== null) ? <UserCard user={feed[0]} /> : "No Users in Feed"}
      </div>
  )
}

export default Feed