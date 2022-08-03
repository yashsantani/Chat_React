import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signupImage from "../assets/signup.jpg";

const cookies = new Cookies();
const Auth = () => {
  const initialstate = {
    fullName: "",
    userName: "",
    phoneNumber: "",
    avatarURL: "",
    password: "",
    confirmPassword: "",
  };
  const [issignup, setsignup] = useState(true);
  const [form, Setform] = useState(initialstate);

  const handlechange = (e) => {
    Setform({ ...form, [e.target.name]: e.target.value });
  };
  const SwitchMode = () => {
    setsignup((previssingup) => !previssingup);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, password, phoneNumber, avatarURL } = form;

    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, fullName, hashedPassword },
    } = await axios.post(`${URL}/${issignup ? "signup" : "login"}`, {
      userName,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("userID", userId);
    cookies.set("userName", userName);
    cookies.set("fullName", fullName);

    if (issignup) {
      cookies.set("hashedPassword", hashedPassword);
      cookies.set("avatarURL", avatarURL);
      cookies.set("phoneNumber", phoneNumber);
    }
    window.location.reload();
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{issignup ? "Sign up" : "Sign in"}</p>
          <form onSubmit={handleSubmit}>
            {issignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handlechange}
                  required
                ></input>
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">User Name</label>
              <input
                name="userName"
                type="text"
                placeholder="user name"
                onChange={handlechange}
                required
              ></input>
            </div>

            {issignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handlechange}
                  required
                ></input>
              </div>
            )}

            {issignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handlechange}
                  required
                ></input>
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handlechange}
                required
              ></input>
            </div>
            {issignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handlechange}
                  required
                ></input>
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{issignup ? "Sign up" : "Sign in"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            {issignup ? "Already Have an account?" : "Don't have an account"}
            <span onClick={SwitchMode}>
              {issignup ? " Sign in" : " Sign up"}
            </span>
          </div>
        </div>
      </div>

      <div className="auth__form-container_image">
        <img src={signupImage} alt="Sign up" />
      </div>
    </div>
  );
};

export default Auth;
