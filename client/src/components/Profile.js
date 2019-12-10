import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
// const uploadCloud = require("../cloudinary");

const Profile = props => {
  const [user, setUser] = useState(props.user);
  const [editForm, setEditForm] = useState(false);
  const [quote, setQuote] = useState("");
  const [messages, setMessages] = useState(null);
  const [image, setImage] = useState("");

  console.log("user props", props.user);
  const date = props.user.created_at;

  // first mount
  useEffect(() => {
    console.log("did mount");
    axios
      .get("/profile")
      .then(response => {
        setMessages(response.data.messages);
      })
      .catch(err => {
        if (err.response.status === 404) {
          console.log(err);
          // setError(err.response.data.message);
        }
      });
  }, []);

  useEffect(() => {
    console.log("Quote is being changed");
  }, [quote, image]);

  useEffect(() => {
    console.log("mounted or updated");
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log("unmount");
  //   };
  // }, []);

  const toggleEditForm = () => {
    // edit form when button is clicked
    setEditForm(!editForm);
  };

  const handleChange = event => {
    setQuote(event.target.value);
  };

  const handleUpload = event => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", event.target.files[0]);
    axios
      .post("/upload", uploadData)
      .then(response => {
        console.log(response.data);
        const image = response.data.secure_url;
        setImage(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put("/profile", { quote, image })
      .then(response => {
        setUser(response.data);
        setQuote(response.data.quote);

        // setMessages(response.data.messsages);
        // console.log("resssssssssssss", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log("USAR", user);
  return (
    <div>
      <h1>Profile</h1>
      <img src={user.image} height="150px" />
      <h2>{props.user.username}</h2>
      <h5>
        gerriting since{" "}
        {date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4)}
      </h5>
      <h5>so far.. {messages} messages sent</h5>
      {user.quote && <h5>Quote: "{user.quote}"</h5>}
      {/* <Button onClick={toggleEditForm}>Edit profile</Button> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="quote">Quote: </Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={quote}
            onChange={handleChange}
          />
          {/* upload new image button */}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="image">New profile picture</Form.Label>
          <input type="file" name="image" id="image" onChange={handleUpload} />
        </Form.Group>
        <Button type="submit">Edit</Button>
      </Form>
    </div>
  );
};
export default Profile;
