import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [account, setAccount] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event) => {
    if (event.target.checked) {
      setAccount(true);
    } else {
      setAccount(false);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        age,
        birthdate,
        account,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const respone = await axios.get(`http://localhost:5000/users/${id}`);
    setName(respone.data.name);
    setEmail(respone.data.email);
    setAge(respone.data.age);
    setBirthDate(respone.data.birthdate);
    setAccount(respone.data.account);
    setGender(respone.data.gender);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Input Your Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input Your email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Age</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Input Your Age"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Birth Date</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={birthdate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Type Account</label>
            <div className="control">
              <input
                type="checkbox"
                className="checkbox"
                value={account}
                onChange={handleChange}
                checked={account}
              />
              Admin
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-info">
              Save Edit User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
