import React, { useEffect, useState } from 'react';

const UserComponent = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserData();
  };

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
      const data = await response.json();
      setUserData(data.result[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <button type="submit">Fetch User Data</button>
      </form>

      {userData ? (
        <div>
          <h2>User Information</h2>
            <p> Username: {userData.handle}</p>
            <p> Rating: {userData.rating}</p>
            <p> Max Rating: {userData.maxRating}</p>
            <p> Rank: {userData.rank} </p>
            <p> Max Rank: {userData.maxRank} </p>
            <p> Contribution: {userData.contribution} </p>
            {/* Include other relevant user data */}
        </div>
      ) : (
        <p> No user data fetched yet.</p>
      )}
    </div>
  );
};

export default UserComponent;