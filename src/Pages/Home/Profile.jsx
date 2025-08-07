import React, { useState, useEffect } from "react";
import "./Profile.css";
 
import { useNavigate } from "react-router";


const Profile = () => {

   const navigate = useNavigate();
   
  useEffect(() => {
    if (!user || user.isLogged !== "true") {
      navigate("/login");
    }
  }, []);


  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    city: "",
    avatar: "",
  };

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({ ...user, avatar: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (

    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <label>
            <img
              src={user.avatar || "https://i.pravatar.cc/80"}
              alt="Profile"
              className="avatar"
            />
            {editMode && <input type="file" onChange={handleImageChange} />}
          </label>
        </div>
        <h2>{user.name || "Your Name"}</h2>

        {editMode ? (
          <button className="edit-btn" onClick={handleSave}>
            💾 Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            ✎ Edit
          </button>
        )}
      </div>

      <h3>Personal Details</h3>
      <div className="grid">
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          {editMode ? (
            <select name="gender" value={user.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <input value={user.gender || ""} readOnly />
          )}
        </div>
      </div>

      <h3>Address</h3>
      <div className="grid">
        <div className="form-group">
          <label>Country</label>
          <input
            name="country"
            value={user.country || ""}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
        <div className="form-group">
          <label>City/State</label>
          <input
            name="city"
            value={user.city || ""}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
