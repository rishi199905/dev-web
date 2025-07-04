import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLoginForm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    // handleValidation();
    if (errorMsg === "") {
      try {
        const loginResponse = await axios.post(
          BASE_URL + "/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(loginResponse.data));
        return navigate("/");
      } catch (error) {
        setErrorMsg(error?.response?.data);
      }
    }
  };

  const handleValidation = () => {
    if (!email || email === "") {
      setErrorMsg("Email cannot be empty!");
    } else {
    console.log("here")

      setErrorMsg("");
    }
    if ((!password || password === "") && errorMsg === "") {
      setErrorMsg("password cannot be empty!");
    } else {
    console.log("here")

      setErrorMsg("");
    }
    if (!isLogin) {
    console.log((!firstName || firstName === "") && errorMsg === "")

      if ((!firstName || firstName === "") && errorMsg === "") {
        setErrorMsg("First Name cannot be empty!");
      } else {
    console.log("here")

        setErrorMsg("");
      }
      if ((!lastName || lastName === "") && errorMsg === "") {
        setErrorMsg("Last Name cannot be empty!");
      } else {
    console.log("here")

        setErrorMsg("");
      }
    }
  };

  const handleSignUp = async () => {
    // handleValidation();
    // console.log(errorMsg)
    if (errorMsg === "") {
      try {
        const signinResponse = await axios.post(
          BASE_URL + "/signup",
          {
            firstName,
            lastName,
            email,
            password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(signinResponse.data?.data));
        return navigate("/profile");
      } catch (error) {
        setErrorMsg(error?.response?.data);
      }
    }
  };
  return (
    <div className="flex justify-center mt-5">
      <div className="card card-border bg-slate-200 w-96">
        <div className="card-body display">
          <button
            className="btn bg-white border-[#e5e5e5]"
            onClick={() => setIsLoginForm(!isLogin)}
          >
            {" "}
            {!isLogin ? "Already User ? Login" : "New User ? Sign Up"}{" "}
          </button>

          <h2 className="card-title text-black">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {!isLogin ? (
            <div >
              <fieldset className="fieldset ">
                <legend className="fieldset-legend text-black">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                </legend>

                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => {
                    setErrorMsg("");
                    setFirstName(e.target.value);
                  }}
                  placeholder="Type First Name"
                />
              </fieldset>
            </div>
          ) : null}
          {!isLogin ? (
            <div >
              <fieldset className="fieldset ">
                <legend className="fieldset-legend text-black">
                  {" "}
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                </legend>

                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => {
                    setErrorMsg("");
                    setLastName(e.target.value);
                  }}
                  placeholder="Type Last Name"
                />
              </fieldset>
            </div>
          ) : null}
          <div >
            <fieldset className="fieldset ">
              <legend className="fieldset-legend text-black">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
              </legend>
              <input
                type="text"
                value={email}
                className="input"
                onChange={(e) => {
                  setErrorMsg("");
                  setEmailId(e.target.value);
                }}
                placeholder="Type Email here"
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-black">
                {" "}
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
              </legend>
              <input
                type="text"
                value={password}
                className="input"
                onChange={(e) => {
                  setErrorMsg("");
                  setpassword(e.target.value);
                }}
                placeholder="Type Password here"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-end">
            {errorMsg ? <p className="text-red-700">{errorMsg}</p> : null}
            <button
              className="btn bg-white border-[#e5e5e5]"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {" "}
              <svg
                aria-label="Email icon"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="black"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>{" "}
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
