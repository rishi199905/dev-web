import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import { addUser } from './utils/userSlice'
import { BASE_URL } from './utils/constants'

const Profile = () => {
 const user = useSelector((store) => store.user)
         
    console.log(user)
     
    const [ skillList, setSkillList ] = useState(["Angular", "C", "C++", "Express","Flutter","Go", "Javascript", "Java", "Kotlin", "MongoDB", "Node.js", "Python", "R", "Ruby", "Vue.js"])
    const [ firstName, setFirstName ]  = useState(user.firstName)
    const [ lastName, setLastName ]  = useState(user.lastName)
    const [ about, setAbout ]  = useState(user.about || "")
    const [ age, setAge ]  = useState(user.age || "")
    const [ photoUrl, setphotoUrl ]  = useState(user.photoUrl || "")
    const [ skills, setSkills ]  = useState(user.skills || [])
      const [ errorMsg, setErrorMsg ]  = useState('')
      const [ showSuccess, setshowSuccess ]  = useState(false)
    console.log(3)

   
  
    const dispatch = useDispatch()
    const updateProfile = async () => {
        try {
            const response = await axios.patch(BASE_URL + "/profile/edit", {
              firstName, lastName, about, photoUrl, skills, age
            }, {withCredentials: true})
            dispatch(addUser(response.data))
            console.log(response.data)
            setshowSuccess(true)
            await delay()
        } catch (error) {

            setErrorMsg(error?.response?.data)
        }

    }
  const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
          setshowSuccess(false)
          resolve(true)
        }, 1000)
    })
  }

  const addSkill = (index) => {
    let filteredItems = skillList.filter(item => item !== skillList[index]);
    setSkillList(filteredItems)
    console.log(skillList)
    setSkills(prev => [...prev, skillList[index]])
  }
  return (
    <div>
      
      <div className="flex justify-center ">
      
        <div className="card card-border bg-slate-100 mt-5">
            <h2 className="card-title text-black mt-5 ml-5">Edit Profile</h2>

          <div className="card-body grid grid-cols-2">
       
            <div>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend text-black">Fisrt Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder=""
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder=""
                />
              </fieldset>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend text-black">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  placeholder=""
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">Skills</legend>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Click To Add Your Skills</button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-1/2 max-w-5xl">
                      <h3 className="font-bold text-lg">Add Skills</h3>
                      
                      <ul className="list bg-base-100 rounded-box shadow-md">
  
                            
                           { skills.map((skill, ind) => (
                            <li className="list-row grid grid-cols-4">
                              <div>
                                <div>{skill}</div>
                              </div>
                              <div><button onClick={() => {removeSkill(ind)}} className="btn btn-square btn-ghost">
                               Remove
                              </button></div>
                              
                            </li>
                           ))

                            }
                            
                            
                          </ul>
                      
                      <ul className="list bg-base-100 rounded-box shadow-md">
  
                            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Choose skills from the list</li>
                            
                           { skillList.map((skill, ind) => (
                            <li className="list-row grid grid-cols-4">
                              <div>
                                <div>{skill}</div>
                              </div>
                              <div><button onClick={() => {addSkill(ind)}} className="btn btn-square btn-ghost">
                               Add
                              </button></div>
                              
                            </li>
                           ))

                            }
                            
                            
                          </ul>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
              </fieldset>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend text-black">About</legend>
                <input
                  type="text"
                  value={about}
                  className="input"
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                  placeholder=""
                />
              </fieldset>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend text-black">Photo Url</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  onChange={(e) => {
                    setphotoUrl(e.target.value);
                  }}
                  placeholder=""
                />
              </fieldset>
            </div>

            <div className="card-actions justify-end">
              {errorMsg ? <p className="text-red-700">{errorMsg}</p> : null}
              <button className="btn btn-primary" onClick={updateProfile}>
                Update
              </button>
            </div>
          </div>
        </div>
 <div className="divider divider-horizontal">View</div>
 <div className='mt-5'>
<UserCard
          user={{
            firstName,
            lastName,
            age,
            about,
            photoUrl,
            skills,
          }}
        />
 </div>
        
      </div>
      {showSuccess ? <div className="toast toast-bottom toast-right mb-10">
       
       <div className="alert alert-success">
         <span>Update successful.</span>
       </div>
     </div> : null}
    </div>
  );
}

export default Profile