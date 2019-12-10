import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
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
  console.log("props mparams:", props.match.params);

  console.log("user props", props.user);
  // const date = props.user.created_at;
  const { id } = props.match.params;
  // first mount
  useEffect(() => {
    console.log("did mount");
    axios
      .get(`/profile/${id}`)
      .then(response => {
        setUser(response.data.user);
        setMessages(response.data.messages);
      })
      .catch(err => {
        if (err.response.status === 404) {
          console.log(err);
          setError(err.response.data.message);
        }
      });
  }, []);

  useEffect(() => {
    console.log("imageChanged");
  }, [image]);

  useEffect(() => {
    console.log("quote Changed");
  }, [quote]);

  useEffect(() => {
    console.log("editform Changed");
  }, [editForm]);

  useEffect(() => {
    console.log("upload changed");
  }, [upload]);
  useEffect(() => {
    console.log("mounted or updated");
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log("unmount");
  //   };
  // }, []);

  // edit form should pops up when button is clicked
  const toggleEditForm = () => {
    setEditForm(!editForm);
  };

  const handleChange = event => {
    setQuote(event.target.value);
  };

  const handleUpload = event => {
    console.log("The file to be uploaded is: ", event.target.files[0]);
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

  console.log("USAR", user);
  return (
    <div>
      <h1>Profile</h1>
      <img src={user.image} height="150px" />
      <h2>{user.username}</h2>
      <h5>
        gerriting since{" "}
        {user.created_at.slice(8, 10) +
          "-" +
          user.created_at.slice(5, 7) +
          "-" +
          user.created_at.slice(0, 4)}
      </h5>
      <h5>so far {messages} messages sent</h5>
      {user.quote && <h5>Quote: "{user.quote}"</h5>}
      {canUpdate && (
        <>
          <Button onClick={toggleEditForm}>Edit profile</Button>
        </>
      )}

      {editForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="quote">Quote </Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={quote}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      )}
      {upload && (
        <div className="loadingio-spinner-spinner-8gmk4npur0m">
          <div className="ldio-utk0u7ye5gr">
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
      )}
      {editForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="image">Edit profile picture</Form.Label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleUpload}
            />
          </Form.Group>
          {!upload && <Button type="submit">Submit</Button>}
        </Form>
      )}
    </div>
  );
};

export default Profile;
