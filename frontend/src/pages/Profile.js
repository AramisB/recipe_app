import React, { useContext, useState } from 'react';
import { AuthContext } from '../pages/AuthContext';
import '../styles/profile.css';

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [age, setAge] = useState(user?.age || '');
  const [sex, setSex] = useState(user?.sex || '');
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(age, sex, profilePic);
      alert('Profile updated successfully');
    } catch (err) {
      alert(err.message);
    }
  };
  
  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="profile-info">
        <img src={user?.profilePic || '/default-profile.png'} alt="Profile" className="profile-pic" />
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Age:</strong> {user?.age}</p>
        <p><strong>Sex:</strong> {user?.sex}</p>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Update Profile</h2>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Sex</label>
          <input
            type="text"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            onChange={handleProfilePicChange}
          />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
