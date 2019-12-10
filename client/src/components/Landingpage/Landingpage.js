import React, { Component, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import signet from "../../images/signet.png"
import green from "../../images/green3.png"
import grey from "../../images/grey.png"
import red from "../../images/red2.png"
import './Landingpage.css'
import Login from "../Login"
import Signup from "../Signup"
import { setLocation } from "../../services/location";

const Landingpage = props => {

  const[formDisplay, setFormDisplay] = useState("login");

  const handleClick = event => {
    if (event.target.name == "loginToggle") {
      setFormDisplay("login")
    } 
    else {
      setFormDisplay("signup")
    }
  }

  useEffect(() => {
    setLocation()
      .then(result => {
        console.log("setting the chatroom: ", result.data)
        props.setUserChatroom(result.data);
      })
      .catch(err => console.log(err))
  })

  return(
    <div className="landing-page">
      <div className="signet-container">
        <img src={signet} alt="signet" className="signet" />
      </div>
      <h1>Gerrit with Gerrits nearby!</h1>
      <div className="availability">
        { props.userChatroom.length > 0 ?
        <>
        <div>
          <img className="traffic-light" src={green} alt="green-light"/><img className="traffic-light grey-light" src={grey} alt="grey-light"/>
        </div>
        <div>
          <p>Connect with people that are near you by joining one of our local chatrooms.</p>
        </div>
        </>
        :
        <><div><img className="traffic-light grey-light" src={grey} alt="grey-light"/><img className="traffic-light" src={red} alt="red-light"/></div>
        <div><p>Sorry, there is no chatroom available at your current location. Check out the map to find the nearest chatroom. </p></div></> }
      </div>
      <div className="switch-container">
        <button className={`switch left-switch ${formDisplay === "login" ? "orange-gradient" : ""}`} onClick={handleClick} name="loginToggle">Log in</button>
        <button className={`switch right-switch ${formDisplay === "signup" ? "orange-gradient" : ""}`} onClick={handleClick} name="signupToggle">Sign up</button>
      </div>
      {formDisplay === "login" ? <Login {...props} setUser={props.setUser} setUserChatroom={props.setUserChatroom}/> : <Signup {...props} setUser={props.setUser} setUserChatroom={props.setUserChatroom}/>}
    </div>
  )
}

export default Landingpage