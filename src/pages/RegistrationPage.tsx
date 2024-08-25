import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegistrationPage.css";

const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "", // New field for user type
    uenNumber: "",
    peopleServed: "",
    contactNumber: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registering with", form);

    // Store userType and email in localStorage
    localStorage.setItem("userType", form.userType);
    localStorage.setItem("email", form.email);

    // Navigate to the login page after successful registration
    navigate("/login");
  };

  return (
    <div className="fullscreen-container">
      <div className="registration-box">
        <h2>Register</h2>
        <form class="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">Beneficiary or Looking to Donate Food?</label>
            <select
              id="userType"
              name="userType"
              value={form.userType} // Ensure the select value is bound to form.userType
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select type of Organisation
              </option>
              <option value="foodDonor">Food Donor/Restaurant Establishment</option>
              <option value="beneficiary">Beneficiary</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="uenNumber">Company UEN Number</label>
            <input
              id="uenNumber"
              type="text"
              name="uenNumber"
              value={form.uenNumber}
              onChange={handleChange}
              required
            />
          </div>
          {form.userType === "beneficiary" && (
            <div className="form-group">
              <label htmlFor="peopleServed">Size of Organisation</label>
              <input
                id="peopleServed"
                type="number"
                name="peopleServed"
                value={form.peopleServed}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              type="text"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <div className="login-prompt">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
