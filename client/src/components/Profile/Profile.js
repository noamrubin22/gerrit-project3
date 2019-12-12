import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { Button, Form } from "react-bootstrap";
import "./Profile.css";
// const uploadCloud = require("../cloudinary");

const Profile = props => {
  const [user, setUser] = useState(props.user);
  const [editForm, setEditForm] = useState(false);
  const [quote, setQuote] = useState("");
  const [messages, setMessages] = useState(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [upload, setUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  // console.log("props params:", props.match.params);

  // console.log("user props", props.user);
  const { id } = props.match.params;
  console.log(user.username);
  // first mount

  useEffect(() => {
    if (id != user._id) {
      updateData(id);
    } else {
      return;
    }
  });

  const updateData = id => {
    axios
      .get(`/profile/${id}`)
      .then(response => {
        setUser(response.data.user);
        setImage(response.data.user.image);
        setMessages(response.data.messages);
        console.log("USER RESPONSE", response.data.user.username);
      })
      .catch(err => {
        if (err.response.status === 404) {
          console.log(err);
          setError(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    updateData(id);
    // console.log("did mount");
    // console.log("HALLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", id);
  }, []);

  useEffect(() => {
    // console.log("imageChanged");
  }, [image]);

  useEffect(() => {
    // console.log("quote Changed");
  }, [quote]);

  useEffect(() => {
    // console.log("editform Changed");
  }, [editForm]);

  useEffect(() => {
    // console.log("upload changed");
  }, [upload]);

  useEffect(() => {
    // console.log("mounted or updated");
  }, []);

  // edit form should pops up when button is clicked
  const toggleEditForm = () => {
    setEditForm(!editForm);
  };

  const handleChange = event => {
    setQuote(event.target.value);
    setSubmitButton(true);
  };

  const handleUpload = event => {
    setUpload(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    axios
      .post("/upload", uploadData)
      .then(response => {
        console.log(response.data);
        const image = response.data.secure_url;
        setImage(image);
        setUpload(false);
        setUploaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`/profile/${id}`, { quote, image })
      .then(response => {
        setUser(response.data);
        setImage(image);
        console.log(setUploaded);
        setQuote(response.data.quote);
        setEditForm(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  let canUpdate = false;
  if (user._id === props.user._id) {
    canUpdate = true;
  }

  const imageStyle = {
    width: "150px",
    height: "150px",
    backgroundImage: `url(${user.image})`,
    backgroundSize: "cover",
    borderRadius: "50%",
    margin: "10px"
  };

  return (
    <div className="profile-page" id="section1">
      <div className="profile">
        <h1>{user.username}</h1>
        <div style={imageStyle}></div>
        <div className="user-info">
          <p>
            Connected since{" "}
            {user.created_at.slice(5, 7) + "|" + user.created_at.slice(0, 4)}
          </p>
          {user.quote && <h3>"{user.quote}"</h3>}
        </div>
        {/* only user can edit profile */}
        {canUpdate && (
          <>
            {/* change functionality button based on toggle */}
            {!editForm ? (
              <button
                className="main-cta orange-gradient shadow"
                onClick={toggleEditForm}
              >
                EDIT PROFILE
              </button>
            ) : (
              <button
                className="main-cta orange-gradient shadow"
                onClick={handleSubmit}
              >
                UPDATE PROFILE
              </button>
            )}
          </>
        )}
      </div>

      <div className="edit-profile" id="section2">
        {editForm && (
          <form className="edit-container" onSubmit={handleSubmit}>
            <div className="input-container">
              {user.quote ? (
                <label htmlFor="quote">Edit bio</label>
              ) : (
                <label htmlFor="quote">Add a bio</label>
              )}
              <input
                className="input-field"
                type="text"
                name="quote"
                className="input-field"
                value={quote}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="image">Edit profile picture </label>
              <input
                className="input-field"
                type="file"
                name="image"
                id="image"
                onChange={handleUpload}
              />
            </div>
          </form>
        )}

        {/* show spinner when picture is being uploaded to cloudinary */}
        {upload && (
          <div className="spinner">
            <div class="loadingio-spinner-spinner-oy8l5dlfwyd">
              <div class="ldio-dtnk0tydtrg">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
