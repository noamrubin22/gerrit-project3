import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const Profile = props => {
  const [user, setUser] = useState({
    quote: ""
  });
  const [editForm, setEditForm] = useState(false);
  const [quote, setQuote] = useState("");

  console.log(props.user);
  const date = props.user.created_at;

  // first mount
  useEffect(() => {
    console.log("did mount");
    axios
      .get("/profile")
      .then(response => {
        console.log(response.data);
        setUser(response.data);
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
  }, [quote]);

  useEffect(() => {
    console.log("mounted or updated");
  }, []);

  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);

  const toggleEditForm = () => {
    // edit form when button is clicked
    setEditForm(!editForm);
  };

  const handleChange = event => {
    // console.log(event.target.value);
    setQuote(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("quote", { quote });
    axios
      .put("/profile", { quote })
      .then(response => {
        setUser(response.data);
        setQuote(response.data.quote);
        console.log("resssssssssssss", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div>
      <h1>Profile page</h1>
      <h2>{props.user.username}</h2>
      {/* if quote exist, show, same for picture */}
      {/* <h2>quote</h2> */}
      {/* <h2>upload picture</h2> */}
      <h2>
        gerriting since{" "}
        {date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4)}
      </h2>
      {user.quote && <h5>{user.quote}</h5>}
      {/* amount of messages send */}
      {/* friends?? */}
      {/* button for editing profile */}
      <button onClick={toggleEditForm}>Edit profile</button>
      <Form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <Form.Group>
          <Form.Label htmlFor="quote">Quote: </Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={quote}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Edit</Button>
      </Form>
    </div>
  );
};
export default Profile;