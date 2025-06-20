import React, { useEffect, useState } from 'react'
import { BASE_URL } from './utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from './utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
  // const [ connections, setConnections ] = useState([])
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const conResponse = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(conResponse?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // if (connections.length() === 0) return ( <div>No Connections</div>)

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <ul className="list bg-base-800 rounded-box shadow-lg my-3">
            <li key={_id} className="list-row grid grid-cols-4">
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className='mt-4'>
                <div>{firstName + " " + lastName}</div>
              </div>
              <div className="text-sm uppercase font-semibold mt-4">
                  {about}
                </div>
              <div> <Link to={"/chat/" + _id} className="text-left">
                <button className="btn btn-primary">Chat</button>
              </Link></div>
              
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Connections;